import { MongoDBContactDataSource } from "../../../src/data/data-sources/mongodb-user-datasource"
import { NoSQLDatabaseWrapper } from "../../../src/data/interfaces/data-sources/nosql-database-wrapper"
import { describe, expect, test, beforeEach, beforeAll, jest } from '@jest/globals';
import { User } from "../../../src/domain/entities/user";
import { UUID } from "mongodb";

describe("MongoDB DataSource", () => {

    let mockDatabase: NoSQLDatabaseWrapper

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(() => Promise.resolve([])),
            findOne: jest.fn(() => Promise.resolve({})),
            insertOne: jest.fn(() => Promise.resolve()),
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase)
        const dateNow = new Date()
        const uuid = UUID.generate().toString()
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ firstName: "hotdog", lastName: "Ha?", email: "test@test.com", id: uuid, createdAt: dateNow }]))
        const result = await ds.getAll()
        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual([{ firstName: "hotdog", lastName: "Ha?", email: "test@test.com", id: uuid, createdAt: dateNow }])
    })


    test("create", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "123" }))
        const userToCreate = User.create("John", "Constantine", "test@test.com")
        const result = await ds.create(userToCreate)
        expect(mockDatabase.insertOne).toHaveBeenCalledWith(userToCreate)
    })

    test("getOne", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        const user = User.create("John", "Constantine", "test@test.com");
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([user]))
        const result = await ds.getOne(user.id)
        expect(result).toStrictEqual(user)
        expect(mockDatabase.find).toHaveBeenCalledWith({ _id: user.id })
    })


    test("findOne", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        const user = User.create("John", "Constantine", "test@test.com")
        jest.spyOn(mockDatabase, "findOne").mockImplementation(() => Promise.resolve(user))
        const result = await ds.findByEmail(user.email)
        expect(result).toStrictEqual(user)
        expect(mockDatabase.findOne).toHaveBeenCalledWith({ email: user.email })
    })
})