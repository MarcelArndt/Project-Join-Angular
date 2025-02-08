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


export interface Category {
    name: string;
    color: string;
}

export interface AllCategory {
    [key: string]: Category;
}