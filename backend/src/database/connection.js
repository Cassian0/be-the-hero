const knex = require('knex');
/*(..)indica que aqui estamos voltando pastas para acessar o file knexfile.js */
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;

