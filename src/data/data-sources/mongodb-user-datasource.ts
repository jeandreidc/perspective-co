import { UserCreateRequestModel, UserResponseModel } from "../../app/models/user-model";
import { NoSQLDatabaseWrapper } from "../interfaces/data-sources/nosql-database-wrapper";
import { UserDataSource } from "../interfaces/user-datasource";

export class MongoDBContactDataSource implements UserDataSource {

    private db: NoSQLDatabaseWrapper
    constructor(db: NoSQLDatabaseWrapper) {
        this.db = db
    }
    async deleteOne(id: String) {
        await this.db.deleteOne(id)
    }
    async updateOne(id: String, data: UserCreateRequestModel) {
        await this.db.updateOne(id, data)
    }

    async getOne(id: String): Promise<UserResponseModel> {
        const result = await this.db.find({ _id: id })
        return result.map(item => ({
            id: item._id.toString(),
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            createdAt: item.createdAt,
        }))[0]
    }

    async create(contact: UserCreateRequestModel) {
        await this.db.insertOne(contact)
    }

    async getAll(): Promise<UserResponseModel[]> {
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