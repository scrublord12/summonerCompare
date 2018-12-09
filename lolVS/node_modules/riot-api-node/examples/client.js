const Client = require('../lib/Client');

const client = new Client(process.env.API_KEY, 'euw');

module.exports = client;
