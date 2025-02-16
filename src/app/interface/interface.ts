export interface Contact {
    firstname: string;
    secondname: string;
    inital: string;
    color: string;
    email: string;
    phone: string;
}

export interface AllUsers {
    [key: string]: Contact;
}

export interface Person {
    firstname: string;
    secondname: string;
    inital: string;
}

export interface Category {
    name: string;
    color: string;
}

export interface AllCategory {
    [key: string]: Category;
}

export interface SubTask {
    text: string;
    inOnEdit: boolean;
    isDone: boolean;
}


export interface AllSubTask {
    [key: string]: SubTask;
}

export interface Tasks {
    [key: string]: TaskPayload
}

export interface TaskPayload {
    name: string;
    description: string;
    assignedTo: string[];
    date: string;
    progress: number;
    priority: string;
    category: Category;
    subTasks: AllSubTask;
}

