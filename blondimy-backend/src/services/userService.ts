// Core
import {injectable, inject} from "tsyringe";

// Models
import User from "../models/user";

// DTO
import UserDTO from "../dto/userDTO";

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

        const user = new User({
            username: userData.username,
            hash: hash
        });
        return user.save();
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

    public toDTO(user: any){
        const dto: UserDTO = {
            id: user._id,
            username: user.username,
            created: user.created
        }
        return dto;
    }
    public toDTOs(users: Array<any>){
        return users.map(user => this.toDTO(user));
    }
}