// Core imports
import cors from 'cors';
import express from 'express';
const bodyParser = require('body-parser');

import { Server } from './server';

// Backend configuration
import config from '../config';


/**
 * Configurate the server with the express middlewares
 * @param server 
 */
export default function loadExpress(server: Server){
    // Express application recovery
    const app = server.app;

    // Enable Cross Origin Resource Sharing
    app.use(cors());

    // Requests of application/x-www-form-urlencoded parser
    app.use(bodyParser.urlencoded({ extended: true }))

    // Requests of type application/json parser
    app.use(bodyParser.json())

    // Raw data to json middleware
    app.use(require('body-parser').json());
}
