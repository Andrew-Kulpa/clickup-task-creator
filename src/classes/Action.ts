import { Inputs } from './Inputs';
import { ClickUpRequester } from './ClickUpRequester';
import { TaskRequestContentFactory } from './TaskRequestContentFactory';
import { ContentType } from '../models/ContentType.enum';
import { Context } from '@actions/github/lib/context';
import { HTTPMethod } from '../models/HTTPMethod.enum';

/**
 * Action creates GitHub release action
 */
export class Action {
  /**
   * Action takes an object containing the inputs from the config file,
   * an object implementing the release interface functions,
   * and an artifact uploader which uploads a list of artifact files to GitHub actions
   * @param {Inputs} inputs
   */
  constructor(
    private readonly inputs: Inputs,
    private readonly context: Context
  ) { }

  /**
   * Runs the GitHub action
   * @return {Promise<void>}
   */
  async run(): Promise<void> {
    let requester = new ClickUpRequester(this.inputs.clickup_token);
    const path = `/api/v2/list/${this.inputs.list_id}/task`;
    const task_name = this.createTaskName();
    const task_description = this.createTaskDescription();

    let taskRequesterContentFactory = new TaskRequestContentFactory(task_name, this.inputs.status);
    taskRequesterContentFactory.setContent(task_description, ContentType.markdown)
    let taskRequestContent = taskRequesterContentFactory.createTaskRequest();
    requester.requestBody = taskRequestContent;

    let response = await requester.request(HTTPMethod.POST, 443, path);
    let response_data = {
      status: [response.status, response.statusText].join(" - "),
      data: response.data,
      headers: response.headers
    };
    console.log("ClickUp Response:", response_data);

    // TODO: get task id, url from response --> post comment on Issue / PR for it
    // https://github.com/actions/toolkit/blob/master/docs/github-package.md#sending-requests-to-the-github-api
  }

  createTaskName(): string {
    let task_name = "<DEFAULT TASK NAME>";

    if (this.context.payload.pull_request) {
      task_name =
        "Review Pull Request - #" +
        this.context.payload.pull_request.number + " " +
        this.context.payload.pull_request.title;
    } else if (this.context.payload.issue) {
      task_name =
        "Resolve Issue - #" +
        this.context.payload.issue.number + " " +
        this.context.payload.issue.title;
    }
    return task_name;
  }

  // val = issue_comment, type = [created, destroyed]
  // val = issues, type = [opened, edited, milestoned]
  // val = pull_request, type = [
  //    assigned, unassigned, labeled, unlabeled, opened, edited, closed, reopened, 
  //    synchronize, ready_for_review, locked, unlocked, review_requested, 
  //    review_request_removed
  //  ]
  // val = pull_request_review, type = [submitted,edited,dismissed]
  // val = pull_request_review_comment, type = [created,edited,deleted]
  createTaskDescription(): string {
    let task_description = "";

    const context_info = {
      "url": this.context.payload?.pull_request?.html_url || this.context.payload?.issue?.html_url,
      "assignees": this.context.payload?.pull_request?.assignees || this.context.payload?.issue?.assignees,
      "reviewers": this.context.payload?.pull_request?.reviewers,
      "branch": this.context.payload?.pull_request?.branch
    }
    Object.entries(context_info).forEach(entry => {
      task_description += entry.join(": ") + "\n";
    })
    task_description += "\n" + (this.context?.payload?.pull_request?.body || this.context?.payload?.issue?.body);
    return task_description;
  }
}
