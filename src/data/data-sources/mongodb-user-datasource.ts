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
        return result[0];
    }

    async create(user: User) {
        this.db.insertOne(user);
    }

    async getAll(): Promise<User[]> {
        return await this.db.find({});
    }

}