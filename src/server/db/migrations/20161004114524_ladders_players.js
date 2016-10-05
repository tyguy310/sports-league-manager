exports.up = function(knex, Promise) {
  return knex.schema.createTable('ladders_players', table => {
    table.integer('ladder_id');
    table.foreign('ladder_id').references('id').inTable('ladders');
    table.integer('players_id');
    table.foreign('players_id').references('id').inTable('players');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ladders_players');
};
