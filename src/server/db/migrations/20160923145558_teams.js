
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.string('zip').notNullable();
    table.string('gender').notNullable();
    table.boolean('coed').notNullable();
    table.integer('players_id').notNullable();
    table.foreign('players_id').references('id').inTable('players');
    table.integer('sports_id').notNullable();
    table.foreign('sports_id').references('id').inTable('sports');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teams');
};
