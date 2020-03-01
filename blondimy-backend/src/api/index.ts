// Core imports
import express from 'express';

// API imports
import health from './healthController'
import users from './usersController'

const api = express.Router();

api.use('/', health);
api.use('/', users);

export default api;