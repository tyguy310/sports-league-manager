
exports.seed = function (knex, Promise) {
  return knex('ladders')
  .then(function() {
    return Promise.all([
      knex('ladders').insert({
        type: 'Singles Ping Pong',
        table_name: 'singles_ping_pong',
        sport_id: 11,
        max_positions: 20
      })
    ]);
  });
};
