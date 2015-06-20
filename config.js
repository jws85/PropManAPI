var config = {};

config.db = 'db/propman.db';
config.port = process.env.port || 8080;
config.basePath = '/api';

module.exports = config;
