
const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('singles_ping_pong')
  .then(function() {
    return Promise.all([
      knex('singles_ping_pong').insert({
        player_id: 1
      }),
      knex('singles_ping_pong').insert({
        player_id: 11
      }),
      knex('singles_ping_pong').insert({
        player_id: 6
      }),
      knex('singles_ping_pong').insert({
        player_id: 7
      }),
      knex('singles_ping_pong').insert({
        player_id: 4
      }),
      knex('singles_ping_pong').insert({
        player_id: 2
      }),
      knex('singles_ping_pong').insert({
        player_id: 21
      }),
      knex('singles_ping_pong').insert({
        player_id: 17
      }),
      knex('singles_ping_pong').insert({
        player_id: 14
      }),
      knex('singles_ping_pong').insert({
        player_id: 12
      })
    ]);
  });
};
