import * as github from '@actions/github';
import { setFailed, warning, info } from '@actions/core';
import { Action } from './classes/Action';
import { ActionInputs } from './classes/Inputs';
import { ClickUpRequester } from './classes/ClickUpRequester';

/**
 * Creates a GitHub Release Action
 * @return {Action}
 */
function createAction(): Action {
    const context = github.context;
    const inputs = new ActionInputs(context);

    return new Action(inputs, context);
}

/**
 * Runs the GitHub Action
 * @return {void}
 */
async function run(): Promise<void> {
    try {
        const action = createAction();
        await action.run();
    } catch (error) {
        setFailed(error.message);
    }
}

run();
