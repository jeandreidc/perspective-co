import { UUID } from "mongodb";

export class User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date = new Date();

    private constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public static create(firstName: string, lastName: string, email: string): User {
        let user = new User(firstName, lastName, email);
        user.id = new UUID().toString();
        return user;
    }
}