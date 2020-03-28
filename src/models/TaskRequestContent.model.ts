import { CustomField } from './CustomField.model';

export interface TaskRequestContent {
    name: string,
    status: string,
    // Instead of content you can pass markdown_content with valid markdown 
    // syntax to add formatting to the task description.
    content?: string,
    markdownContent?: string,
    assignees: number[], // assignees is an array of the assignees' userids to be added to this task. 
    tags?: string[],
    priority?: number,
    dueDate?: number,
    dueDateTime?: boolean,
    timeEstimate?: number, // Time estimate is in milliseconds.
    startDate_Time?: boolean,
    notifyAll?: boolean,
    customFields?: CustomField[]
}

