// Backend configuration
import config from '../config';
import {getMongooseConnectionURL} from '../loaders/mongoose'

// Models
import User from '../models/user';


export default class DatabaseUtils {
    static async drop() {
        var mongoose = require('mongoose');
        // Database connection using the mongoose configuration
        return mongoose.connect(getMongooseConnectionURL(), config.mongoose.connectionOptions)
            .then( async () => {
                // Delete all the documents of all the available registered models
                for(var key in mongoose.models){
                    await mongoose.models[key].deleteMany({});
                }
        });
    }
}

