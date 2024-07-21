export default class List {
    constructor({title, description, date, priority}) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.priority = priority;
    }

    get getTitle() {
        return this.title;
    }
    set setTitle(newTitle) {
        this.title = newTitle;
    }
    get getDescription() {
        return this.description;
    }
    set setDescription(newDescription) {
        this.description = newDescription;
    }
    get getDate() {
        return this.date;
    }
    set setDate(newDate) {
        this.date = newDate;
    }
    get getPriority() {
        return this.priority;
    }
    set setPriority(newPriority) {
        this.priority = newPriority;
    }
}