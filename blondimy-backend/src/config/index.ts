const config = {
    /* NodeJS configuration */
    node: {
        port: process.env.PORT || 3000
    },

    /* API configuration */
    api: {
        prefix: 'api',
        version: 'v1',
    },

    /* Mongoose */
    mongoose: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        dbName: process.env.DB_NAME || "blondimy",
        connectionOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },

    /* JWT */
    jwt: {
        secret: process.env.JWT_SECRET || 'XXX-XXX-XXX',
    }
}


export default config;
