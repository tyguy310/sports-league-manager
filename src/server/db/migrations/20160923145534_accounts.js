
exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', table => {
    table.increments();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts');
};
