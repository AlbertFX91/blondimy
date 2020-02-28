// Core imports
import express from 'express';

// API imports
import health from './health'
import projects from './projects'

const api = express.Router();

api.use('/', health);
api.use('/', projects);

export default api;