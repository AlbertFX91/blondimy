// Core imports
import cors from 'cors';

// Custom imports
import api from '../api';
import { Server } from './server';
import config from '../config';

/**
 * Create a prefix for the API entrypoint with the version
 * Example: ('api', 'v1') => '/api/v1'
 * @param prefix 
 * @param version 
 */
export function constructAPIRoot(prefix: string, version: string) : string {
    return `/${prefix}/${version}`;
}

/**
 * Add all the routes from the api to the server
 * @param server 
 */
export default function loadAPI(server: Server) {
    // Express application recovery
    const app = server.app;

    // API full prefix construction with version
    const apiRoot = constructAPIRoot(config.api.prefix, config.api.version);

    // API registration
    app.use(apiRoot, api);
};