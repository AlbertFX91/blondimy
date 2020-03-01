// Backend configuration
import config from '../config';
import {getMongooseConnectionURL} from '../loaders/mongoose'


export default class DatabaseUtils {
    static async drop() {
        var mongoose = require('mongoose');
        /* Connect to the DB */
        mongoose.connect(getMongooseConnectionURL(), config.mongoose.connectionOptions)
            .then( () => {
            /* Drop the DB */
            mongoose.connection.db.dropDatabase();
        });
    }
}

