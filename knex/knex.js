const Knex = require("knex");
const knexConfig = require("./knexfile");
const dbConnection = Knex(knexConfig);

module.exports = dbConnection;
