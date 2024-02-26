import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/interfaces/repositories/user-repository";
import { UserDataSource } from "../interfaces/user-datasource";

export class UserRepositoryImpl implements UserRepository {
    userDataSource: UserDataSource;
    constructor(contactDataSource: UserDataSource) {
        this.userDataSource = contactDataSource
    }

    findByEmail(email: string): Promise<User> {
        return this.userDataSource.findByEmail(email);
    }
    createUser(user: User): void {
        this.userDataSource.create(user);
    }
    async getUsers(): Promise<User[]> {
        return await this.userDataSource.getAll();
    }
}