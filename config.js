const config = {
    development: {
        port: 5000,
    },
    production: {
        port: 5000,
    },
};

module.exports = config[process.env.NODE_ENV] || config.development;
