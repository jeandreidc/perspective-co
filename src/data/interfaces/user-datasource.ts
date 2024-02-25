import { UserCreateRequestModel, UserResponseModel } from "../../app/models/user-model";


export interface UserDataSource {
    create(user: UserCreateRequestModel): void;
    getAll(): Promise<UserResponseModel[]>;
    deleteOne(id: String): void;
    updateOne(id: String, data: UserCreateRequestModel): void;
    getOne(id: String): Promise<UserResponseModel | null>;
}