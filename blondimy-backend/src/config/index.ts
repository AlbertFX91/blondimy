const config = {
    /* NodeJS configuration */
    node: {
        port: process.env.PORT || 3000
    },

    /* API configuration */
    api: {
        prefix: 'api',
        version: 'v1',
    }
}


export default config;
