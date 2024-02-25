import { User } from "../../domain/entities/user";

export interface UserCreateRequestModel {
    firstName: string;
    lastName: string;
    email: string;
}

export class UserResponseModel {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;

    public static fromUserModel(user: User) {
        let result = new UserResponseModel();

        result.id = user.id!;
        result.firstName = user.firstName;
        result.lastName = user.lastName;
        result.email = user.email;
        result.createdAt = user.createdAt;

        return result;
    }
}