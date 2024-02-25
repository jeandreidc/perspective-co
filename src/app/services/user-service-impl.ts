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

    createUser(newUser: UserCreateRequestModel): void {
        let existingUser = this.userRepository.findByEmail(newUser.email);
        if (existingUser != null) throw new EmailAlreadyExistsError();
        let user = User.create(newUser.firstName, newUser.lastName, newUser.email);
        this.userRepository.createUser(user);
    }

    getAllUsers(): Promise<UserResponseModel[]> {
        return this.userRepository
            .getUsers()
            .then(users => users.map(u => UserResponseModel.fromUserModel(u)),
                reason => {
                    console.log(reason);
                    throw Error("Error fetching users!")
                });
    }

}