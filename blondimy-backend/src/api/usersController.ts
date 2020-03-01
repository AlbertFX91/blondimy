// Core
import express from 'express';
import "reflect-metadata";
import {container} from "tsyringe";
import { check, validationResult, body, param } from 'express-validator';

// Middlewares
import asyncHandler from '../middlewares/async-handler'

// Services
import UserService from "../services/userService";

// Models
import User from '../models/user';

const app = express.Router();

const userService = container.resolve(UserService);

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
app.post('/users',
    [
        body('username').isLength({min: 1}),
        body('password').isLength({min: 5}),
    ], 
    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        userService.create(req.body)
            .then(user => userService.toDTO(user))
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    }
);

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

export default app;