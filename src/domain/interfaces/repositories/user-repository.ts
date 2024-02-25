import { User } from "../../entities/user";

export interface UserRepository {
    createUser(contact: User): Promise<boolean>;
    getUsers(): Promise<User[]>;
    findByEmail(email: string): Promise<User>;
}