import { getInput, warning } from '@actions/core';
import { Context } from '@actions/github/lib/context';

export interface Inputs {
  readonly list_id: number
  readonly status: string
  readonly github_token: string
  readonly clickup_token: string
}

/**
 * ActionInputs implements the Inputs interface
 */
export class ActionInputs implements Inputs {
  /**
   * Action inputs takes an artifact globber and the current GitHub context
   * @param {ArtifactGlobber} artifactGlobber
   * @param {Context} context
   */
  constructor(
    private context: Context,
  ) { }

  /**
   * Returns the List ID for the Task
   * @return {number}
   */
  get list_id(): number {
    return Number(getInput('list_id', { required: true }));
  }

  /**
   * Returns the specified Task Status
   * @return {string}
   */
  get status(): string {
    return getInput('status', { required: true });
  }

  /**
   * Returns the specified GitHub API token
   * @return {string}
   */
  get github_token(): string {
    return getInput('github_token', { required: true });
  }

  /**
   * Returns the specified ClickUp API token
   * @return {string}
   */
  get clickup_token(): string {
    return getInput('clickup_token', { required: true });
  }
}
