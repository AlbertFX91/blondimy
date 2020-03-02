import express from 'express'

// Typescript
import { Application } from 'express'

export class Server {
    public app: Application | any;
    public port: any
    public running: boolean;

    private serverInstance: any

    constructor() {
        this.app = express();
        this.running = false;
    }

    public config(config: any) {
        this.port = config.node.port;
    }

    public listen() {
        this.serverInstance = this.app.listen(this.port, () => {
            this.running = true;
            console.log(`Server is running http://localhost:${this.port} ...`)
        });

    }

    public async close() {
        if(this.serverInstance) {
            await this.serverInstance.close(()=>{});
        }
        var mongoose = require('mongoose');
        await mongoose.disconnect();
        this.running = false;
    }
};

const server: Server = new Server();

export default server;