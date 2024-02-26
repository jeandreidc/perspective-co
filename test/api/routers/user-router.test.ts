
import { describe, expect, test, beforeEach, jest, beforeAll } from '@jest/globals';
import { UserService } from '../../../src/app/services/user-service';
import { UserCreateRequestModel, UserResponseModel } from '../../../src/app/models/user-model';
import UserRouter from '../../../src/api/routers/user-router';
import request from "supertest";
import { UUID } from 'mongodb';
import express from 'express';


class MockUserService implements UserService {
    createUser(newUser: UserCreateRequestModel): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getAllUsers(sortAscendingByCreation: boolean): Promise<UserResponseModel[]> {
        throw new Error('Method not implemented.');
    }
}

describe("Contact Router", () => {
    let mockUserService: MockUserService;
    let server = express()
        .use(express.json());

    beforeAll(() => {
        mockUserService = new MockUserService()
        server.use("/users", UserRouter(mockUserService))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /users", () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{ firstName: "Tony", lastName: "Stark", email: "test@test.com", id: new UUID().toString(), createdAt: new Date() }];
            jest.spyOn(mockUserService, "getAllUsers").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/users")

            expect(response.status).toBe(200)
            expect(mockUserService.getAllUsers).toBeCalledTimes(1)

            expect(JSON.stringify(response.body)).toEqual(JSON.stringify(ExpectedData))

        });

        test("GET /contact returns 500 on use case error", async () => {
            jest.spyOn(mockUserService, "getAllUsers").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/users")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });

        test("GET /contact returns 400 wrong query params for created", async () => {
            jest.spyOn(mockUserService, "getAllUsers").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/users?created=holycowbatman")
            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1)
        });

        test("GET /contact returns 200 proper query params for created", async () => {
            const ExpectedData = [{ firstName: "Tony", lastName: "Stark", email: "test@test.com", id: new UUID().toString(), createdAt: new Date() }];
            jest.spyOn(mockUserService, "getAllUsers").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/users")
            expect(response.status).toBe(200)
            expect(mockUserService.getAllUsers).toBeCalledTimes(1)
        });
    })

    describe("POST /users", () => {

        test("POST /users", async () => {
            const InputData = { lastName: "Smith", firstName: "John", email: "john@gmail.com" }
            jest.spyOn(mockUserService, "createUser").mockImplementation(() => Promise.resolve())
            const response = await request(server).post("/users").send(InputData)
            expect(response.status).toBe(201)
        });

        test("POST /users returns 500 on use case error", async () => {
            const InputData = { lastName: "Smith", firstName: "John", email: "john@gmail.com" }
            jest.spyOn(mockUserService, "createUser").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/users").send(InputData)
            expect(response.status).toBe(500)
        });

        test("POST /users return 400 invalid email", async () => {
            const InputData = { lastName: "Smith", firstName: "John", email: "johngmail.com" }
            jest.spyOn(mockUserService, "createUser").mockImplementation(() => Promise.resolve())
            const response = await request(server).post("/users").send(InputData)
            expect(response.status).toBe(400)
            expect(response.body.errors).toHaveLength(1)
        });
    })

})