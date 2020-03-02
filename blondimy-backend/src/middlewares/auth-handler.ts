const jwt = require('jsonwebtoken');

import config from '../config';

// Function that sign the id via jwt
export const verify = (id: string) => {
    return jwt.sign({id: id}, config.jwt.secret, {expiresIn: '24h'})
};

// Middleware which checks if the user is authenticated by its token
export const auth = (req: any, res: any, next: any) => {
    try{
        const token: string = req.headers.authorization.split(' ')[1];
        const decoded: any = jwt.verify(token, config.jwt.secret);
        const userId: string = decoded.id;
        req.userId = userId;
        next();
    } catch (e) {
        throw {
            name: 'UnauthorizedError',
            msg: 'Invalid access token'
        };
    }
};