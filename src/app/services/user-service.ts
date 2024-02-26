import { UserCreateRequestModel, UserResponseModel } from "../models/user-model";

export interface UserService {
    createUser(newUser: UserCreateRequestModel): Promise<void>;
    getAllUsers(sortAscendingByCreation: boolean): Promise<UserResponseModel[]>;
}
