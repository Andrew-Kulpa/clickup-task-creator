"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
/**
 * ActionInputs implements the Inputs interface
 */
class ActionInputs {
    /**
     * Action inputs takes only the current GitHub context
     * @param {Context} context
     */
    constructor(context) {
        this.context = context;
    }
    /**
     * Returns the List ID for the Task
     * @return {number}
     */
    get list_id() {
        return Number(core_1.getInput('list_id', { required: true }));
    }
    /**
     * Returns the specified Task Status
     * @return {string}
     */
    get status() {
        return core_1.getInput('status', { required: true });
    }
    /**
     * Returns the specified GitHub API token
     * @return {string}
     */
    get github_token() {
        return core_1.getInput('github_token', { required: true });
    }
    /**
     * Returns the specified ClickUp API token
     * @return {string}
     */
    get clickup_token() {
        return core_1.getInput('clickup_token', { required: true });
    }
}
exports.ActionInputs = ActionInputs;
//# sourceMappingURL=Inputs.js.map