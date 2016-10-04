
exports.seed = function (knex, Promise) {
  return knex('ladders')
  .then(function() {
    return Promise.all([
      knex('ladders').insert({
        type: 'Singles Ping Pong',
        sport_id: 11
      })
    ]);
  });
};
