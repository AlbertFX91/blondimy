import "reflect-metadata";

import {Server} from './loaders/server';

import createServer from './loaders/index';

// Server creation
createServer()
  .then((app: Server) => {
    app.listen();
  });