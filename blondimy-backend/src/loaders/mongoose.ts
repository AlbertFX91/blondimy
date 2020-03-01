import config from '../config';

/**
 * Return the mongoose connection URL 
 * @param host 
 * @param port 
 * @param dbName 
 */
function constructMongooseConnectionURL(host: string, port: string | number, dbName: string): string {
    return `mongodb://${host}:${port}/${dbName}`;
}

/**
 * Return the mongoose connection URL by config
 */
export function getMongooseConnectionURL() {
    return constructMongooseConnectionURL(config.mongoose.host, config.mongoose.port, config.mongoose.dbName);
}

/**
 * Connection with MongoDB via Mongoose
 */
export default function loadMongoose() {

    var mongoose = require('mongoose');

    const mongooseUrl: string = getMongooseConnectionURL();

    ('[Mongoose connection URL]: ' + mongooseUrl);

    mongoose.set('useCreateIndex', true);

    mongoose.connect(mongooseUrl, config.mongoose.connectionOptions)
    .then(
        () => {console.log("[Mongoose connected]")},
        (err: any) => {console.log("[Mongoose connection error]"); throw err;}
    );
}
