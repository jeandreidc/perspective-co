import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { NoSQLDatabaseWrapper } from './data/interfaces/data-sources/nosql-database-wrapper';
import { MongoDBContactDataSource } from './data/data-sources/mongodb-user-datasource';
import { MongoClient } from 'mongodb';
import UserRouter from './api/routers/user-router';
import { UserServiceImpl } from './app/services/user-service-impl';
import { UserRepositoryImpl } from './data/repositories/user-repository-impl';

dotenv.config();

async function getMongoDS() {
  const client: MongoClient = new MongoClient("mongodb://localhost:27017/users")
  await client.connect()
  const db = client.db("USERS_DB");

  const contactDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("users").find(query).toArray(),
    insertOne: (doc) => db.collection("users").insertOne(doc),
    findOne: (query) => db.collection("users").findOne(query),
  }

  return new MongoDBContactDataSource(contactDatabase);
}

const app: Express = express();

app.use(cors())
  .use(express.json())
  .options('*', cors());

(async () => {
  const dataSource = await getMongoDS();
  const userMiddleware = UserRouter(
    new UserServiceImpl(new UserRepositoryImpl(dataSource)));

  app.use("/users", userMiddleware)
  const port = process.env.PORT || 3111;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})()
