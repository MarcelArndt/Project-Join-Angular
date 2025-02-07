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