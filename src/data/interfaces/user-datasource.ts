import { UserCreateRequestModel, UserResponseModel } from "../../app/models/user-model";
import { User } from "../../domain/entities/user";


export interface UserDataSource {
    create(user: User): void;
    getAll(): Promise<User[]>;
    getOne(id: String): Promise<User | null>;
    findByEmail(id: String): Promise<User | null>;
}