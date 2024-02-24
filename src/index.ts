import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './api/routers/user-router';

dotenv.config();

const app: Express = express();

app.use(cors())
  .use(express.json())
  .options('*', cors());

app.use('', userRouter);

const port = process.env.PORT || 3111;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
