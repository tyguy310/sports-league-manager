
const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('sports')
  .then(function() {
    return Promise.all([
      knex('sports').insert({
        type: 'Soccer',
        team_capacity: 11,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14519909_10101330996980114_3370308183530815686_n.jpg?oh=3175b48980a2904b86ee91f09720ee0d&oe=58760D3B'
      }),
      knex('sports').insert({
        type: 'Ping Pong',
        team_capacity: 2,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14479745_10101330996920234_4784258532521783191_n.jpg?oh=75cce86026f17eb3d25f2a2333a2dd3f&oe=5865C858'
      }),
      knex('sports').insert({
        type: 'Basketball',
        team_capacity: 8,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14484878_10101330996795484_8247661492479665985_n.jpg?oh=83a199acdd35dffc78e2ede66fa8fe88&oe=585FC5A5'
      }),
      knex('sports').insert({
        type: 'Badminton',
        team_capacity: 2,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14523036_10101330996785504_7832998283258304598_n.jpg?oh=bbec1424f5871b5633a9d444c413f7c0&oe=58754CB6'
      }),
      knex('sports').insert({
        type: 'Flag Football',
        team_capacity: 14,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14462734_10101330996840394_166321645970550845_n.jpg?oh=d239647ab348d9a6a5d5be65bfb67c43&oe=587DD23D'
      }),
      knex('sports').insert({
        type: 'Kickball',
        team_capacity: 12,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14449934_10101330996900274_5773423501155343977_n.jpg?oh=872be6fd589f82d88893010f87a66b64&oe=5873ACEF'
      }),
      knex('sports').insert({
        type: 'Softball',
        team_capacity: 10,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14484760_10101330996970134_2424916982626236342_n.jpg?oh=de592bca3498e5792519be2120e5b1da&oe=58AAA320'
      }),
      knex('sports').insert({
        type: 'Baseball',
        team_capacity: 14,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14502729_10101330996790494_5257564768769285447_n.jpg?oh=79f0d907d91563326e6c999a54b87998&oe=586A2EA6'
      }),
      knex('sports').insert({
        type: 'Beer Pong',
        team_capacity: 2,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14484794_10101330996835404_7111260876943833832_n.jpg?oh=1fb5e725564644f9a5a64465c809b5e1&oe=587AE36A'
      }),
      knex('sports').insert({
        type: 'Hockey',
        team_capacity: 8,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14492437_10101330996905264_676908139714525798_n.jpg?oh=2930f93345e7350339525de18d698ea8&oe=586E57C2'
      }),
      knex('sports').insert({
        type: 'Cornhole',
        team_capacity: 2,
        image: 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14440987_10101330996845384_803080968313859076_n.jpg?oh=53a4ed2ad59f3b2a7149fdf32cc9c732&oe=58696622'
      })
    ]);
  });
};
