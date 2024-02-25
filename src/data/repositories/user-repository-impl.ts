import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/interfaces/repositories/user-repository";

export class UserRepositoryImpl implements UserRepository {
    findByEmail(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
}