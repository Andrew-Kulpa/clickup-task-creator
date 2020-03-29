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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const github = __importStar(require("@actions/github"));
const core_1 = require("@actions/core");
const Action_1 = require("./classes/Action");
const Inputs_1 = require("./classes/Inputs");
/**
 * Creates a GitHub Release Action
 * @return {Action}
 */
function createAction() {
    const context = github.context;
    const inputs = new Inputs_1.ActionInputs(context);
    return new Action_1.Action(inputs, context);
}
/**
 * Runs the GitHub Action
 * @return {void}
 */
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const action = createAction();
            yield action.run();
        }
        catch (error) {
            core_1.setFailed(error.message);
        }
    });
}
run();
//# sourceMappingURL=index.js.map