import { UserCreateRequestModel, UserResponseModel } from "../../app/models/user-model";
import { User } from "../../domain/entities/user";
import { NoSQLDatabaseWrapper } from "../interfaces/data-sources/nosql-database-wrapper";
import { UserDataSource } from "../interfaces/user-datasource";

export class MongoDBContactDataSource implements UserDataSource {

    private db: NoSQLDatabaseWrapper
    constructor(db: NoSQLDatabaseWrapper) {
        this.db = db
    }

    async findByEmail(email: String): Promise<User> {
        return await this.db.findOne({ email: email });
    }
    async getOne(id: String): Promise<User> {
        const result = await this.db.find({ _id: id })
        return result.map(item => ({
            id: item._id.toString(),
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            createdAt: item.createdAt,
        }))[0];
    }

    async create(user: User) {
        await this.db.insertOne(user);
    }

    async getAll(): Promise<User[]> {
        // pwede lagyan ng mapper dito
        // Todo Andrei: Alamin paano mag filter
        const result = await this.db.find({})
        return result.map(item => ({
            id: item._id.toString(),
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            createdAt: item.createdAt,
        }));
    }

}