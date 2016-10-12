exports.up = function(knex, Promise) {
  return knex.schema.createTable('singles_ping_pong', (table) => {
    table.integer('rank');
    table.integer('player_id').references('id').inTable('players');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('singles_ping_pong');
};
