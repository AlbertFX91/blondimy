// Core
import express from 'express';
import "reflect-metadata";
import {container} from "tsyringe";
import {body, validationResult } from 'express-validator';

// Middlewares
import asyncHandler from '../middlewares/async-handler'

// Services
import UserService from "../services/userService";

// Models
import User from '../models/user';

const app = express.Router();

const userService = container.resolve(UserService);

app.post('/users',
    [
        body('username').isLength({min: 1}),
        body('password').isLength({min: 5}),
    ], 
    asyncHandler(async (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw { name: "ValidationError", msg: errors.array() };
        }
        await userService.create(req.body)
            .then(user => userService.toAuthDTO(user))
            .then(user => res.json(user));
    }
));

// UserController error verbosity which adds extra information for the global error handler 
function errorVerbosity (error: any, req: any, res: any, next: any) {
    if(error.name === 'MongoError') {
        if(error.code === 11000) {
            error.msg = "Duplicated value";
        }
    }
    throw error;
};

app.use(errorVerbosity);
/*
app.get('/users', async (req, res) => {
        userService.findAllUsers()
            .then(users => userService.toDTOs(users))
            .then(users => res.json(users))
});
app.get('/users/:id', async (req: any, res: any, next: any) => {
        const userId = req.params.id;
        userService.findById(userId)
            .then(user => userService.toDTO(user))
            .then(user => res.json(user))
            .catch(err => res.status(404).json({message: "User not found"}));

});


app.put('/users/:id',
    [
        param('id').exists(),
        body('username').isLength({min: 1}),
        body('password').isLength({min: 5}),
    ], 
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const userId: string = req.params.id;
        return userService.update(userId, req.body)
            .then(user => userService.toDTO(user))
            .then((user) => res.json(user))
            .catch((err) => res.status(422).json(err));
    }
);
*/

export default app;