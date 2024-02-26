import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/interfaces/repositories/user-repository";
import { EmailAlreadyExistsError } from "../errors/email-exists-errors";
import { UserCreateRequestModel, UserResponseModel } from "../models/user-model";
import { UserService } from "./user-service";

export class UserServiceImpl implements UserService {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(newUser: UserCreateRequestModel): Promise<void> {
        let existingUser = await this.userRepository.findByEmail(newUser.email);
        console.log(existingUser);
        if (existingUser != null) throw new EmailAlreadyExistsError();
        let user = User.create(newUser.firstName, newUser.lastName, newUser.email);
        this.userRepository.createUser(user);
    }

    getAllUsers(sortAscendingByCreation: boolean): Promise<UserResponseModel[]> {
        return this.userRepository
            .getUsers()
            .then(users => users
                .sort((a, b) => (b.createdAt.getTime() - a.createdAt.getTime()) * (sortAscendingByCreation ? -1 : 1))
                .map(u => UserResponseModel.fromUserModel(u)),
                reason => {
                    throw new Error(reason);
                });
    }

}