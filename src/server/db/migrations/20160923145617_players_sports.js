exports.up = function(knex, Promise) {
  return knex.schema.createTable('players_sports', table => {
    table.integer('players_id').references('id').inTable('players');
    table.integer('sports_id').references('id').inTable('sports');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players_sports');
};
