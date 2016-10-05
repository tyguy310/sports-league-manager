
const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('singles_ping_pong')
  .then(function() {
    return Promise.all([
      knex('singles_ping_pong').insert({
        rank: 1,
        player_id: 1
      }),
      knex('singles_ping_pong').insert({
        rank: 9,
        player_id: 11
      }),
      knex('singles_ping_pong').insert({
        rank: 10,
        player_id: 6
      }),
      knex('singles_ping_pong').insert({
        rank: 2,
        player_id: 7
      }),
      knex('singles_ping_pong').insert({
        rank: 3,
        player_id: 4
      }),
      knex('singles_ping_pong').insert({
        rank: 4,
        player_id: 2
      }),
      knex('singles_ping_pong').insert({
        rank: 5,
        player_id: 21
      }),
      knex('singles_ping_pong').insert({
        rank: 6,
        player_id: 17
      }),
      knex('singles_ping_pong').insert({
        rank: 7,
        player_id: 14
      }),
      knex('singles_ping_pong').insert({
        rank: 8,
        player_id: 12
      })
    ]);
  });
};
