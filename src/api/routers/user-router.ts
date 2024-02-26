
import express, { Express, Request, Response } from 'express';
import { UserService } from '../../app/services/user-service';
import { validationResult, body, ValidationChain, query } from 'express-validator';


const filterValidator: ValidationChain[] = [
    query('created').optional().isIn(['ascending', 'descending', 'asc', 'desc']),
]

const userValidator: ValidationChain[] = [
    body('firstName', 'username is Empty').not().isEmpty(),
    body('lastName', 'username is Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
]

export default function UserRouter(
    userService: UserService
) {

    const router = express.Router();

    router.get('/', filterValidator, async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const users = await userService.getAllUsers(["ascending", "asc"].some(s => s == req.query.created?.toString()));
            res.send(users);
        } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Error fetching data" });
        }
    })

    router.post('/', userValidator, async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        userService.createUser(req.body)
            .then(success => {
                res.statusCode = 201
                res.json({ message: "Created" })
            }, reason => {
                console.log(reason.message)
                res.status(500).send({ message: "Error saving data" })
            });
    })

    return router;
}