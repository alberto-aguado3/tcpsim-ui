import {v4 as uuidv4} from "uuid";

export class Task {
    private readonly ui: string;
    private title: string;

    constructor(taskTitle: string) {
        this.ui = uuidv4();
        this.title = taskTitle;
    }

    getIdentifier() {
        return this.ui;
    }

    getTitle() {
        return this.title;
    }
}