import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './api/routers/user-router';
import { NoSQLDatabaseWrapper } from './data/interfaces/data-sources/nosql-database-wrapper';
import { MongoDBContactDataSource } from './data/data-sources/mongodb-user-datasource';
import { MongoClient } from 'mongodb';
import UserRouter from './api/routers/user-router';

dotenv.config();

async function getMongoDS() {
  const client: MongoClient = new MongoClient("mongodb://localhost:27017/users")
  await client.connect()
  const db = client.db("CONTACTS_DB");

  const contactDatabase: NoSQLDatabaseWrapper = {
    find: (query) => db.collection("contacts").find(query).toArray(),
    insertOne: (doc) => db.collection("contacts").insertOne(doc),
    deleteOne: (id: String) => db.collection("contacts").deleteOne({ _id: id }),
    updateOne: (id: String, data: object) => db.collection("contacts").updateOne({ _id: id }, data)
  }

  return new MongoDBContactDataSource(contactDatabase);
}

const app: Express = express();

app.use(cors())
  .use(express.json())
  .options('*', cors());

(async () => {
  const dataSource = await getMongoDS();
  const userMiddleware = UserRouter(null, null);

  app.use("/users", userMiddleware)
  const port = process.env.PORT || 3111;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})()
