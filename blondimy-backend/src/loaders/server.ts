import express from 'express'

// Typescript
import { Application } from 'express'

class Server {
    public app: Application | any;
    public port: any

    private serverInstance: any

    constructor(config: any){
        this.app = express();
        this.port = config.node.port;
    }

    public listen() {
        this.serverInstance = this.app.listen(this.port, () => {
            console.log(`Server is running http://localhost:${this.port} ...`)
        });

    }

    public close() {
        if(this.serverInstance) {
            this.serverInstance.close(()=>{console.log('Server closed');});
        }
        var mongoose = require('mongoose');
        mongoose.disconnect();
    }
};

export default Server;