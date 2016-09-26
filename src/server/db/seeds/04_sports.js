
const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('sports')
  .then(function() {
  return Promise.all([
    knex('sports').insert({type: 'soccer', team_capacity: 11}),
    knex('sports').insert({type: 'ping_pong', team_capacity: 2}),
    knex('sports').insert({type: 'basketball', team_capacity: 8}),
    knex('sports').insert({type: 'badminton', team_capacity: 2}),
    knex('sports').insert({type: 'flag_football', team_capacity: 14}),
    knex('sports').insert({type: 'kickball', team_capacity: 12}),
    knex('sports').insert({type: 'softball', team_capacity: 10}),
    knex('sports').insert({type: 'baseball', team_capacity: 14}),
    knex('sports').insert({type: 'beer_pong', team_capacity: 2}),
    knex('sports').insert({type: 'soccer', team_capacity: 11}),
    knex('sports').insert({type: 'hockey', team_capacity: 8}),
    knex('sports').insert({type: 'cornhole', team_capacity: 2})
  ]);
  });
};

//   const iterationArray = new Array(1);
//
//   var ArrayOfPromises = Array.from(iterationArray)
//   .map(() => {
//     return sportsSeed(knex);
//   });
//
//   return Promise.all(ArrayOfPromises);
// };
