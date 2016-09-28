
exports.seed = function (knex, Promise) {
  return knex('players_events')
  .then(function() {
    return Promise.all([
      knex('players_events').insert({
        player_id: 1,
        event_id: 1
      }),
      knex('players_events').insert({
        player_id: 1,
        event_id: 2
      }),
      knex('players_events').insert({
        player_id: 1,
        event_id: 3
      }),
      knex('players_events').insert({
        player_id: 2,
        event_id: 1
      }),
      knex('players_events').insert({
        player_id: 3,
        event_id: 1
      }),
      knex('players_events').insert({
        player_id: 4,
        event_id: 1
      }),
      knex('players_events').insert({
        player_id: 5,
        event_id: 2
      })
    ]);
  });
};
