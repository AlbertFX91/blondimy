// Core
import {injectable, inject} from "tsyringe";
let jwt = require('jsonwebtoken');

// Middlewares
import {verify} from '../middlewares/auth-handler';

// Models
import User from "../models/user";

// DTO
import UserDTO from "../dto/userDTO";
import UserAuthDTO from "../dto/userAuthDTO";

// Util
import PasswordHasher from '../utils/passwordHasher'

export default class UserService {

    public async findAllUsers() {
        return User.find({})
    }

    public async findById(userId: string) {
        return User.findById(userId);
    }

    public async findByUsername(username: string) {
        return User.findOne({username: username});
    }

    public async deleteById(userId: string) {
        return User.findOneAndDelete(userId);
    }

    public async create(userData: any) {
        const password: string = userData.password;
        const hash: string = await PasswordHasher.encrypt(password);
        // const token: string = await this.generateToken(userData.username);
        const user = new User({
            username: userData.username,
            hash: hash
        });

        let res = await user.save();
        const token = verify(user._id);
        // Adding the token into the final object
        res.token = token;
        return res;
    }

    public async update(userId: string, userData: any) {
        const password: string = userData.password;
        const hash: string = await PasswordHasher.encrypt(password);
        return this.findById(userId)
            .then((user) => {
                user.username = userData.username;
                user.hash = hash;
                return user.save();
            });
    }

    public async authenticate(userData: any) {
        const username: string = userData.username;
        const password: string = userData.password;
        const user: any = await this.findByUsername(username);
        const credentialsError = {name: 'UnauthorizedError', msg: 'Invalid credentials'};
        if (!user) 
            throw credentialsError;
        const valid = await PasswordHasher.check(password, user.hash);
        if (!valid)
            throw credentialsError;
        const token = verify(user._id);
        user.token = token;
        return user;
    }

    // DTO methods

    public toDTO(user: any){
        const dto: UserDTO = {
            id: user._id,
            username: user.username,
            creationDate: user.creationDate
        }
        return dto;
    }

    public toAuthDTO(user: any){
        const dto: UserAuthDTO = {
            id: user._id,
            username: user.username,
            creationDate: user.creationDate,
            token: user.token
        }
        return dto;
    }

    public toDTOs(users: Array<any>){
        return users.map(user => this.toDTO(user));
    }
}