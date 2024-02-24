
import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const userRouter = express.Router();

userRouter.post('/users', (req: Request, res: Response) => {
    res.send({}).status(201);
});

userRouter.get('/users', (req: Request, res: Response) => {
    res.send([]).status(200);
});

export default userRouter;