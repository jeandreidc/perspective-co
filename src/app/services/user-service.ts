import { UserCreateRequestModel, UserResponseModel } from "../models/user-model";

export interface UserService {
    createUser(newUser: UserCreateRequestModel): void;
    getAllUsers(): Promise<UserResponseModel[]>;
}
