export class TodoError {
    description: string;
    details?: any;

    constructor(description: string, details?: any) {
        this.description = description;
        this.details = details;
    }
}
