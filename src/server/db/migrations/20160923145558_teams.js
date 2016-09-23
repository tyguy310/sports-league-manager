
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.string('zip').notNullable().unique();
    table.string('gender').notNullable();
    table.boolean('coed').notNullable();
    table.integer('users_id').notNullable();
    table.foreign('users_id').references('id').inTable('users');
    table.integer('users_id').notNullable();
    table.foreign('users_id').references('id').inTable('users');
    table.integer('sports_id').notNullable();
    table.foreign('sports_id').references('id').inTable('sports');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teams');
};
