// Types
import Server from './server';

// Error middlewares
import errorHandler from '../middlewares/error-handler'

/**
 * Configurate the server with custom middlewares
 * @param server 
 */
export default function loadMiddlewares(server: Server){
    // Express application recovery
    const app = server.app;

    // Express status monitor [https://github.com/RafalWilinski/express-status-monitor]
    app.use(require('express-status-monitor')({
        title: 'Blondimy API Status',
        path: '/'
    }));

    // Error middleware (must be the last one)
    app.use(errorHandler);
}
