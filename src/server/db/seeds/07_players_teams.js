
exports.seed = function (knex, Promise) {
  return knex('players_teams')
  .then(function() {
    return Promise.all([
      knex('players_teams').insert({
        players_id: 1,
        teams_id: 1
      }),
      knex('players_teams').insert({
        players_id: 1,
        teams_id: 2
      }),
      knex('players_teams').insert({
        players_id: 1,
        teams_id: 3
      }),
      knex('players_teams').insert({
        players_id: 2,
        teams_id: 1
      }),
      knex('players_teams').insert({
        players_id: 3,
        teams_id: 1
      }),
      knex('players_teams').insert({
        players_id: 4,
        teams_id: 1
      }),
      knex('players_teams').insert({
        players_id: 5,
        teams_id: 2
      })
    ]);
  });
};
