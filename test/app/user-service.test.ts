import { EmailAlreadyExistsError } from "../../src/app/errors/email-exists-errors";
import { UserCreateRequestModel } from "../../src/app/models/user-model";
import { UserServiceImpl } from "../../src/app/services/user-service-impl";
import { User } from "../../src/domain/entities/user";
import { UserRepository } from "../../src/domain/interfaces/repositories/user-repository";
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

describe("Create user", () => {
    class MockUserRepository implements UserRepository {
        createUser(contact: User): Promise<boolean> {
            throw new Error("Method not implemented.");
        }
        getUsers(): Promise<User[]> {
            throw new Error("Method not implemented.");
        }
        findByEmail(email: string): Promise<User> {
            throw new Error("Method not implemented.");
        }
    }

    let mockUserRepo: MockUserRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockUserRepo = new MockUserRepository()
    })

    test("should create user", async () => {
        const InputData: UserCreateRequestModel = { firstName: "hotdog", lastName: "Ha?", email: "test@test.com" };

        jest.spyOn(mockUserRepo, "createUser").mockImplementation(() => Promise.resolve(true))
        jest.spyOn(mockUserRepo, "findByEmail").mockImplementation(() => null)
        const userSvc = new UserServiceImpl(mockUserRepo)
        userSvc.createUser(InputData);
        expect(mockUserRepo.createUser).toBeCalledTimes(1)

    });

    test("email exists should throw EmailAlreadyExistsError", async () => {
        const InputData: UserCreateRequestModel = { firstName: "hotdog", lastName: "Ha?", email: "test@test.com" };

        jest.spyOn(mockUserRepo, "createUser").mockImplementation(() => Promise.resolve(true))
        jest.spyOn(mockUserRepo, "findByEmail").mockImplementation(() => Promise.resolve(User.create("", "", "")))
        const userSvc = new UserServiceImpl(mockUserRepo)

        const result = () => {
            userSvc.createUser(InputData)
        };

        expect(result).toThrow(EmailAlreadyExistsError);
    });
})