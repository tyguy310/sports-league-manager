exports.up = function(knex, Promise) {
  return knex.schema.createTable('players_teams', table => {
    table.integer('players_id').references('id').inTable('players');
    table.integer('teams_id').references('id').inTable('teams');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players_teams');
};
