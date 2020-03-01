// Core
import {injectable, inject} from "tsyringe";
let jwt = require('jsonwebtoken');

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

    public async create(userData: any) {
        const password: string = userData.password;
        const hash: string = await PasswordHasher.encrypt(password);
        const token: string = await this.generateToken(userData.username);
        const user = new User({
            username: userData.username,
            hash: hash
        });
        let res = await user.save();
        // Adding the token into the final object
        res.token = token;
        return res;
    }

    public async generateToken(username: string): Promise<string> {
        const token: string = jwt.sign({username: username},
            "TOP SECRET", { expiresIn: '24h'});
        return token;
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

    // DTO methods

    public toDTO(user: any){
        const dto: UserDTO = {
            id: user._id,
            username: user.username,
            created: user.created
        }
        return dto;
    }

    public toAuthDTO(user: any){
        console.log(user);
        const dto: UserAuthDTO = {
            id: user._id,
            username: user.username,
            token: user.token
        }
        return dto;
    }

    public toDTOs(users: Array<any>){
        return users.map(user => this.toDTO(user));
    }
}