const knex = require('knex');
const knexConfig = require('../knexfile.js');

// select development from knexfile
const db = knex(knexConfig.development);

module.exports = db;

// module.exports = knex(knexConfig.development);
