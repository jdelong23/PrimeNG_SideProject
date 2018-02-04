export class Subtopic {
    title: string;
    start: string;
    status: number;

    constructor(title: string, date: string, status: number) {
        this.title = title;
        this.start = date;
        this.status = status;
    }
}