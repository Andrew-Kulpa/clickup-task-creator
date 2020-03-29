"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContentType_enum_1 = require("../models/ContentType.enum");
class TaskRequestContentFactory {
    constructor(name, status) {
        this.taskRequestContent = this.initializeTaskRequestContent(name, status);
    }
    initializeTaskRequestContent(name, status) {
        return {
            name,
            status
        };
    }
    setContent(content, type) {
        if (type === ContentType_enum_1.ContentType.markdown) {
            this.taskRequestContent.markdown_content = content;
        }
        else if (type === ContentType_enum_1.ContentType.plaintext) {
            this.taskRequestContent.content = content;
        }
    }
    createTaskRequest() {
        return this.taskRequestContent;
    }
}
exports.TaskRequestContentFactory = TaskRequestContentFactory;
//# sourceMappingURL=TaskRequestContentFactory.js.map