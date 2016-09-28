
const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('sports')
  .then(function() {
    return Promise.all([
      knex('sports').insert({
        type: 'Soccer',
        team_capacity: 11,
        image: '../../images/sports/soccer.jpg'
      }),
      knex('sports').insert({
        type: 'Ping Pong',
        team_capacity: 2,
        image: '../../images/sports/pingpong.jpg'
      }),
      knex('sports').insert({
        type: 'Basketball',
        team_capacity: 8,
        image: '../../images/sports/basketball.jpg'
      }),
      knex('sports').insert({
        type: 'Badminton',
        team_capacity: 2,
        image: '../../images/sports/badminton.jpeg'
      }),
      knex('sports').insert({
        type: 'Flag Football',
        team_capacity: 14,
        image: '../../images/sports/flagfootball.jpeg'
      }),
      knex('sports').insert({
        type: 'Kickball',
        team_capacity: 12,
        image: '../../images/sports/kickball.jpg'
      }),
      knex('sports').insert({
        type: 'Softball',
        team_capacity: 10,
        image: '../../images/sports/softball.jpg'
      }),
      knex('sports').insert({
        type: 'Baseball',
        team_capacity: 14,
        image: '../../images/sports/baseball.jpg'
      }),
      knex('sports').insert({
        type: 'Beer Pong',
        team_capacity: 2,
        image: '../../images/sports/beerpong.jpg'
      }),
      knex('sports').insert({
        type: 'Hockey',
        team_capacity: 8,
        image: '../../images/sports/hockey.jpg'
      }),
      knex('sports').insert({
        type: 'Cornhole',
        team_capacity: 2,
        image: '../../images/sports/cornhole.jpg'
      })
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
