
exports.seed = function (knex, Promise) {
  return knex('ladders')
  .then(function() {
    return Promise.all([
      knex('ladders').insert({
        type: 'Singles Ping Pong',
        table_name: 'singles_ping_pong',
        max_positions: 20,
        sport_id:   knex('sports').select('id').where('type', 'Ping Pong')
      })
    ]);
  });
};
