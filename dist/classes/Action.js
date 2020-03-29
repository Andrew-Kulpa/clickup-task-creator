"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClickUpRequester_1 = require("./ClickUpRequester");
const TaskRequestContentFactory_1 = require("./TaskRequestContentFactory");
const ContentType_enum_1 = require("../models/ContentType.enum");
const HTTPMethod_enum_1 = require("../models/HTTPMethod.enum");
/**
 * Action creates GitHub release action
 */
class Action {
    /**
     * Action takes an object containing the inputs from the config file,
     * an object implementing the release interface functions,
     * and an artifact uploader which uploads a list of artifact files to GitHub actions
     * @param {Inputs} inputs
     */
    constructor(inputs, context) {
        this.inputs = inputs;
        this.context = context;
    }
    /**
     * Runs the GitHub action
     * @return {Promise<void>}
     */
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let requester = new ClickUpRequester_1.ClickUpRequester(this.inputs.clickup_token);
            const path = `/api/v2/list/${this.inputs.list_id}/task`;
            const task_name = this.createTaskName();
            const task_description = this.createTaskDescription();
            let taskRequesterContentFactory = new TaskRequestContentFactory_1.TaskRequestContentFactory(task_name, this.inputs.status);
            taskRequesterContentFactory.setContent(task_description, ContentType_enum_1.ContentType.markdown);
            let taskRequestContent = taskRequesterContentFactory.createTaskRequest();
            requester.requestBody = taskRequestContent;
            let response = yield requester.request(HTTPMethod_enum_1.HTTPMethod.POST, 443, path);
            let response_data = {
                status: [response.status, response.statusText].join(" - "),
                data: response.data,
                headers: response.headers
            };
            console.log("ClickUp Response:", response_data);
            // TODO: get task id, url from response --> post comment on Issue / PR for it
            // https://github.com/actions/toolkit/blob/master/docs/github-package.md#sending-requests-to-the-github-api
        });
    }
    createTaskName() {
        let task_name = "<DEFAULT TASK NAME>";
        if (this.context.payload.pull_request) {
            task_name =
                "Review Pull Request - #" +
                    this.context.payload.pull_request.number + " " +
                    this.context.payload.pull_request.title;
        }
        else if (this.context.payload.issue) {
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
    createTaskDescription() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        let task_description = "";
        const context_info = {
            "url": ((_b = (_a = this.context.payload) === null || _a === void 0 ? void 0 : _a.pull_request) === null || _b === void 0 ? void 0 : _b.html_url) || ((_d = (_c = this.context.payload) === null || _c === void 0 ? void 0 : _c.issue) === null || _d === void 0 ? void 0 : _d.html_url),
            "assignees": ((_f = (_e = this.context.payload) === null || _e === void 0 ? void 0 : _e.pull_request) === null || _f === void 0 ? void 0 : _f.assignees) || ((_h = (_g = this.context.payload) === null || _g === void 0 ? void 0 : _g.issue) === null || _h === void 0 ? void 0 : _h.assignees),
            "reviewers": (_k = (_j = this.context.payload) === null || _j === void 0 ? void 0 : _j.pull_request) === null || _k === void 0 ? void 0 : _k.reviewers,
            "branch": (_m = (_l = this.context.payload) === null || _l === void 0 ? void 0 : _l.pull_request) === null || _m === void 0 ? void 0 : _m.branch
        };
        Object.entries(context_info).forEach(entry => {
            task_description += entry.join(": ") + "\n";
        });
        task_description += "\n" + (((_q = (_p = (_o = this.context) === null || _o === void 0 ? void 0 : _o.payload) === null || _p === void 0 ? void 0 : _p.pull_request) === null || _q === void 0 ? void 0 : _q.body) || ((_t = (_s = (_r = this.context) === null || _r === void 0 ? void 0 : _r.payload) === null || _s === void 0 ? void 0 : _s.issue) === null || _t === void 0 ? void 0 : _t.body));
        return task_description;
    }
}
exports.Action = Action;
//# sourceMappingURL=Action.js.map