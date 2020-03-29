import { CustomField } from './CustomField.model';

export interface TaskRequestContent {
    name: string,
    status: string,
    // Instead of content you can pass markdown_content with valid markdown 
    // syntax to add formatting to the task description.
    content?: string,
    markdown_content?: string,
    assignees: number[], // assignees is an array of the assignees' userids to be added to this task. 
    tags?: string[],
    priority?: number,
    dueDate?: number,
    due_date_time?: boolean,
    time_estimate?: number, // Time estimate is in milliseconds.
    start_date_Time?: boolean,
    notify_all?: boolean,
    custom_fields?: CustomField[]
}

