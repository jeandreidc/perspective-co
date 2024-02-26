import { User } from "../../entities/user";

export interface UserRepository {
    createUser(contact: User): void;
    getUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
}