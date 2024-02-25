import moment from "moment";
import { EmailAlreadyExistsError } from "../../src/app/errors/email-exists-errors";
import { UserCreateRequestModel, UserResponseModel } from "../../src/app/models/user-model";
import { UserServiceImpl } from "../../src/app/services/user-service-impl";
import { User } from "../../src/domain/entities/user";
import { UserRepository } from "../../src/domain/interfaces/repositories/user-repository";
import { describe, expect, test, beforeEach, jest } from '@jest/globals';

describe("User Service", () => {
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

    describe("Create user", () => {
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
            jest.spyOn(mockUserRepo, "findByEmail").mockImplementation(() => Promise.resolve(User.create("123", "Existing", "Email Result")))
            const userSvc = new UserServiceImpl(mockUserRepo)

            const result = () => {
                userSvc.createUser(InputData)
            };

            expect(result).toThrow(EmailAlreadyExistsError);
        });

    })

    describe("Get users", () => {
        test("should get all users descending", async () => {
            const InputData: UserCreateRequestModel = { firstName: "hotdog", lastName: "Ha?", email: "test@test.com" };

            let today = moment();

            const ExpectedResult: User[] = [
                {
                    id: "1",
                    firstName: "Jabari",
                    lastName: "Smith",
                    createdAt: moment(today).add(1, "days").toDate(),
                    email: "test@test.com"
                },
                {
                    id: "2",
                    firstName: "Jabari",
                    lastName: "Smith",
                    createdAt: moment(today).subtract(3, "days").toDate(),
                    email: "test@test.com"
                },
                {
                    id: "3",
                    firstName: "Jabari",
                    lastName: "Smith",
                    createdAt: moment(today).subtract(1, "days").toDate(),
                    email: "test@test.com"
                },

            ];

            jest.spyOn(mockUserRepo, "getUsers").mockImplementation(() => Promise.resolve(ExpectedResult))
            const userSvc = new UserServiceImpl(mockUserRepo)
            const result = await userSvc.getAllUsers(false);
            expect(mockUserRepo.getUsers).toBeCalledTimes(1);

            expect(result).toStrictEqual(ExpectedResult
                .map(u => UserResponseModel.fromUserModel(u))
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));


        });

        test("should get all users ascending", async () => {
            const InputData: UserCreateRequestModel = { firstName: "hotdog", lastName: "Ha?", email: "test@test.com" };

            let today = moment();

            const ExpectedResult: User[] = [
                {
                    id: "1",
                    firstName: "Jabari",
                    lastName: "Smith",
                    createdAt: moment(today).add(1, "days").toDate(),
                    email: "test@test.com"
                },
                {
                    id: "2",
                    firstName: "Jabari",
                    lastName: "Smith",
                    createdAt: moment(today).subtract(3, "days").toDate(),
                    email: "test@test.com"
                },
                {
                    id: "3",
                    firstName: "Jabari",
                    lastName: "Smith",
                    createdAt: moment(today).subtract(1, "days").toDate(),
                    email: "test@test.com"
                },

            ];

            jest.spyOn(mockUserRepo, "getUsers").mockImplementation(() => Promise.resolve(ExpectedResult))
            const userSvc = new UserServiceImpl(mockUserRepo)
            const result = await userSvc.getAllUsers(true);
            expect(mockUserRepo.getUsers).toBeCalledTimes(1);

            expect(result).toStrictEqual(ExpectedResult
                .map(u => UserResponseModel.fromUserModel(u))
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()));


        });

        test("getUsers db error should throw error", async () => {
            jest.spyOn(mockUserRepo, "getUsers").mockImplementation(() => { throw new Error("Some random db error"); })
            const userSvc = new UserServiceImpl(mockUserRepo)

            const result = async () => {
                await userSvc.getAllUsers(true);
            };

            expect(result).rejects.toThrowError(Error);
        });

    })
})