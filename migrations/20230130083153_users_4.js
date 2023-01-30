exports.up = function (knex) {
  return knex.schema.createTable("users_4", (table) => {
    table.increments("userId").primary();
    table.string("email").notNull();
    table.string("password").notNull();
    table.string("firstName").notNull();
    table.string("lastName").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_4");
};
