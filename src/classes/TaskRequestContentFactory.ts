import { TaskRequestContent } from '../models/TaskRequestContent.model';
import { ContentType } from '../models/ContentType.enum';

export class TaskRequestContentFactory {
    private taskRequestContent: TaskRequestContent;
    constructor(name: string, status: string) {
        this.taskRequestContent = this.initializeTaskRequestContent(name, status);
    }

    initializeTaskRequestContent(name: string, status: string): TaskRequestContent {
        return {
            name,
            status
        } as TaskRequestContent;
    }

    setContent(content: string, type: ContentType) {
        if (type === ContentType.markdown) {
            this.taskRequestContent.markdown_content = content;
        } else if (type === ContentType.plaintext) {
            this.taskRequestContent.content = content;
        }
    }

    createTaskRequest() {
        return this.taskRequestContent;
    }
}