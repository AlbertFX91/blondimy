import express from 'express'

// Typescript
import { Application } from 'express'

class Server {
    public app: Application
    public port: any

    constructor(config: any){
        this.app = express();
        this.port = config.node.port;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running http://localhost:${this.port} ...`)
        })
    }
};

export default Server;