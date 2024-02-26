
import express, { Express, Request, Response } from 'express';
import { UserService } from '../../app/services/user-service';

export default function UserRouter(
    userService: UserService
) {

    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const contacts = await userService.getAllUsers(req.query.created == "ascending");
            console.log(contacts);
            res.send(contacts);
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            console.log(req.body);
            await userService.createUser(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error saving data" })
        }
    })

    return router;
}