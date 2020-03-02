// Core
import express from 'express';
import "reflect-metadata";
import {container} from "tsyringe";
import {body, header, validationResult } from 'express-validator';

// Middlewares
import asyncHandler from '../middlewares/async-handler';
import {auth} from '../middlewares/auth-handler';

// Services
import UserService from "../services/userService";

// Models
import User from '../models/user';

const app = express.Router();

const userService = container.resolve(UserService);

/**
 * @route POST /users
 * @group Blondimy - Operations about user
 * @param {string} username.body.required - username [Min length: 5]
 * @param {string} password.body.required - user's password [Min length: 5]
 * @returns {object} 200 - An object with the id, username and token from the registered user
 * @returns {Error}  default - Unexpected error
 */
app.post('/users',
    [
        body('username').isLength({min: 5}),
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

/**
 * @route GET /users/auth
 * @group Blondimy - Operations about user
 * @param {string} username.body.required - username [Min length: 5]
 * @param {string} password.body.required - user's password [Min length: 5]
 * @returns {object} 200 - An object with the id, username and token from the registered user
 * @returns {Error}  default - Unexpected error
 */
app.get('/users/auth',
    [
        body('username').isLength({min: 5}),
        body('password').isLength({min: 5}),
    ], 
    asyncHandler(async (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw { name: "ValidationError", msg: errors.array() };
        }
        await userService.authenticate(req.body)
            .then(user => user ? userService.toAuthDTO(user) : {})
            .then(user => res.json(user));
    }
));
/**
 * @route GET /users/me
 * @group Blondimy - Operations about user
 * @param {string} authorization.header.required - Token access
 * @returns {object} 200 - An object with the id, username, creationDate and token from the registered user
 * @returns {Error}  default - Unexpected error
 */
app.get('/users/me',
    [
        header('authorization').exists(),
        auth,
    ], 
    asyncHandler(async (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw { name: "ValidationError", msg: errors.array() };
        }
        await userService.findById(req.userId)
            .then(user => user ? userService.toDTO(user) : {})
            .then(user => res.json(user));
    }
));

/**
 * @route DELETE /users/me
 * @group Blondimy - Operations about user
 * @param {string} authorization.header.required - Token access
 * @returns {object} 200 - An object with the id, username, creationDate from the deleted user
 * @returns {Error}  default - Unexpected error
 */
app.delete('/users/me',
    [
        header('authorization').exists(),
        auth,
    ], 
    asyncHandler(async (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw { name: "ValidationError", msg: errors.array() };
        }
        await userService.deleteById(req.userId)
            .then(user => user ? userService.toDTO(user) : {})
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

export default app;