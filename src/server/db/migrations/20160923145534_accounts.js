exports.up = function(knex, Promise) {
  return knex.schema.createTable('accounts', table => {
    table.increments();
    table.boolean('is_user').defaultTo(false);
    table.boolean('is_admin').defaultTo(false);
    table.string('github_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('accounts');
};
