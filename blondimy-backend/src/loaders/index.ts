import server, { Server } from './server';

// Backend configuration
import config from '../config';

// Loaders
import loadAPI from './api';
import loadMongoose from './mongoose';
import loadExpress from './express';
import loadMiddlewares from './middlewares';

/**
 * Create a new full configured server instance
 */
async function createServer(): Promise<Server> {
    // Server configuration
    server.config(config);

    // Express middlewares
    loadExpress(server);

    // API
    loadAPI(server);

    // Mongoose
    loadMongoose();

    // Custom middlewares
    loadMiddlewares(server);

    return server;
}

export default createServer;
