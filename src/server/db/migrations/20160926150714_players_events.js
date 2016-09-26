exports.up = function(knex, Promise) {
  return knex.schema.createTable('players_events', (table) => {
    table.integer('player_id').references('id').inTable('players');
    table.integer('event_id').references('id').inTable('events');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players_events');
};
