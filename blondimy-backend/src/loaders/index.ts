import Server from './server';

// Backend configuration
import config from '../config';

// Routes
import loadRoutes from './routes';

/**
 * Create a new full configured server instance
 */
async function createServer(): Promise<Server> {
    // Server creation
    const server: Server = new Server(config);

    // Routes
    loadRoutes(server);

    return server;
}

export default createServer;
