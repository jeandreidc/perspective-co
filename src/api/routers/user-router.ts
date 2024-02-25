
import express, { Express, Request, Response } from 'express';
import { UserService } from '../../app/services/user-service';

export default function UserRouter(
    userService: UserService
) {

    const router = express.Router();

    router.get('/users', async (req: Request, res: Response) => {
        try {
            const contacts = await userService.getAllUsers()
            res.send(contacts)
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/users', async (req: Request, res: Response) => {
        try {
            await userService.createUser(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error saving data" })
        }
    })

    return router
}