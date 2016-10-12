const faker = require('faker');

exports.seed = function (knex, Promise) {
  return knex('teams')
  .then(function() {
    return Promise.all([
      knex('teams').insert({
        name: 'No Regretskies',
        zip: 80211,
        image: 'https://hd.unsplash.com/photo-1468465226960-8899e992537c',
        gender: 'male',
        coed: 'false',
        sports_id: knex('sports').select('id').where('type', 'Hockey')
      }),
      knex('teams').insert({
        name: 'Mother Puckers',
        zip: 80223,
        image: 'https://hd.unsplash.com/photo-1468465226960-8899e992537c',
        gender: 'male',
        coed: 'false',
        sports_id:  knex('sports').select('id').where('type', 'Hockey')
      }),
      knex('teams').insert({
        name: 'Ball Busters',
        zip: 80234,
        image: 'https://hd.unsplash.com/photo-1467809941367-bbf259d44dd6',
        gender: 'male',
        coed: 'false',
        sports_id:  knex('sports').select('id').where('type', 'Basketball')
      }),
      knex('teams').insert({
        name: 'The Magic Johnsons',
        zip: 80232,
        image: 'https://hd.unsplash.com/photo-1467809941367-bbf259d44dd6',
        gender: 'female',
        coed: 'false',
        sports_id:   knex('sports').select('id').where('type', 'Basketball')
      }),
      knex('teams').insert({
        name: 'Sons of Pitches',
        zip: 80230,
        image: 'https://hd.unsplash.com/photo-1431324003833-a7d76ef5770b',
        coed: 'true',
        sports_id:   knex('sports').select('id').where('type', 'Soccer')
      }),
      knex('teams').insert({
        name: 'Grass Kickers',
        zip: 80238,
        image: 'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        gender: 'female',
        coed: 'true',
        sports_id:   knex('sports').select('id').where('type', 'Soccer')
      }),
      knex('teams').insert({
        name: 'Man Chest Hair United',
        zip: 80215,
        image: 'https://hd.unsplash.com/photo-1431324003833-a7d76ef5770b',
        gender: 'male',
        coed: 'false',
        sports_id:   knex('sports').select('id').where('type', 'Soccer')
      }),
      knex('teams').insert({
        name: 'Swat Team',
        zip: 80216,
        image: 'https://hd.unsplash.com/photo-1465125672495-63cdc2fa22ed',
        gender: 'female',
        coed: 'false',
        sports_id:   knex('sports').select('id').where('type', 'Ping Pong')
      }),
      knex('teams').insert({
        name: 'Ping Pongthers',
        zip: 80211,
        image: 'https://hd.unsplash.com/photo-1465125672495-63cdc2fa22ed',
        gender: 'male',
        coed: 'true',
        sports_id:    knex('sports').select('id').where('type', 'Ping Pong')
      }),
      knex('teams').insert({
        name: 'Forest Gump\'s Instructors',
        zip: 80215,
        image: 'https://hd.unsplash.com/photo-1465125672495-63cdc2fa22ed',
        gender: 'female',
        coed: 'false',
        sports_id:    knex('sports').select('id').where('type', 'Ping Pong')
      }),
      knex('teams').insert({
        name: 'The Servivors',
        zip: 80261,
        image: 'https://hd.unsplash.com/photo-1465125672495-63cdc2fa22ed',
        coed: 'true',
        sports_id:    knex('sports').select('id').where('type', 'Ping Pong')
      }),
      knex('teams').insert({
        name: 'Racquet Scientists',
        zip: 80222,
        image: 'https://hd.unsplash.com/photo-1465125672495-63cdc2fa22ed',
        coed: 'true',
        sports_id:    knex('sports').select('id').where('type', 'Badminton')
      }),
      knex('teams').insert({
        name: 'Ball Me, Maybe',
        zip: 80223,
        image: 'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:    knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'I Got 99 Problems, but My Kick Ain\'t One',
        zip: 80218,
        image: 'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'New Kicks on the Block',
        zip: 80246,
        image:  'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'Kick in a Box',
        zip: 80202,
        image:  'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'We\'ve Got the Runs',
        zip: 80205,
        image:  'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'Balls \'n Dolls',
        zip: 80207,
        image:  'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'Drinkers with a Kicking Problem',
        zip: 80210,
        image:  'https://hd.unsplash.com/photo-1431324155629-1a6deb1dec8d',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Kickball')
      }),
      knex('teams').insert({
        name: 'Pundt Cakes',
        zip: 80215,
        image: 'https://hd.unsplash.com/photo-1471265004050-b3e8ff9c162e',
        gender: 'male',
        coed: 'false',
        sports_id:     knex('sports').select('id').where('type', 'Badminton')
      }),
      knex('teams').insert({
        name: 'Victorious Secret',
        zip: 80219,
        image: 'https://hd.unsplash.com/photo-1471265004050-b3e8ff9c162e',
        coed: 'true',
        sports_id:     knex('sports').select('id').where('type', 'Flag Football')
      }),
      knex('teams').insert({
        name: 'Show Us Your TD\'s',
        zip: 80224,
        image: 'https://hd.unsplash.com/photo-1471265004050-b3e8ff9c162e',
        gender: 'male',
        coed: 'false',
        sports_id:      knex('sports').select('id').where('type', 'Flag Football')
      }),
      knex('teams').insert({
        name: 'No Punt Intended',
        zip: 80228,
        image: 'https://hd.unsplash.com/photo-1471265004050-b3e8ff9c162e',
        gender: 'male',
        coed: 'false',
        sports_id:      knex('sports').select('id').where('type', 'Flag Football')
      }),
      knex('teams').insert({
        name: 'Pitch, Please',
        zip: 80203,
        image: 'https://hd.unsplash.com/photo-1470083748587-df49227c0505',
        gender: 'female',
        coed: 'false',
        sports_id:      knex('sports').select('id').where('type', 'Softball')
      }),
      knex('teams').insert({
        name: 'Save by the Ball',
        zip: 80231,
        image: 'https://hd.unsplash.com/photo-1434854775064-aa2c72a4aa32',
        gender: 'male',
        coed: 'false',
        sports_id:       knex('sports').select('id').where('type', 'Softball')
      }),
      knex('teams').insert({
        name: 'Base-ic Pitches',
        zip: 80236,
        image: 'https://hd.unsplash.com/photo-1470083748587-df49227c0505',
        gender: 'female',
        coed: 'false',
        sports_id:       knex('sports').select('id').where('type', 'Softball')
      }),
      knex('teams').insert({
        name: 'Ball Busters',
        zip: 80223,
        image: 'https://hd.unsplash.com/photo-1434854775064-aa2c72a4aa32',
        gender: 'female',
        coed: 'false',
        sports_id:       knex('sports').select('id').where('type', 'Softball')
      }),
      knex('teams').insert({
        name: 'James of Thrones',
        zip: 80206,
        image: 'https://hd.unsplash.com/photo-1448201509143-782c98e5d1c6',
        gender: 'male',
        coed: 'false',
        sports_id:       knex('sports').select('id').where('type', 'Basketball')
      }),
      knex('teams').insert({
        name: 'Game, Blouses',
        zip: 80234,
        image: 'https://hd.unsplash.com/photo-1467809941367-bbf259d44dd6',
        gender: 'male',
        coed: 'false',
        sports_id:        knex('sports').select('id').where('type', 'Basketball')
      }),
      knex('teams').insert({
        name: 'Bosh Spice',
        zip: 80222,
        image: 'https://hd.unsplash.com/photo-1469155472021-fb3489e556fb',
        gender: 'male',
        coed: 'false',
        sports_id:        knex('sports').select('id').where('type', 'Basketball')
      }),
      knex('teams').insert({
        name: 'Houston Rockettes',
        zip: 80223,
        image: 'https://hd.unsplash.com/photo-1448201509143-782c98e5d1c6',
        gender: 'female',
        coed: 'false',
        sports_id:        knex('sports').select('id').where('type', 'Basketball')
      }),
      knex('teams').insert({
        name: 'Booze on First',
        zip: 80203,
        image: 'https://hd.unsplash.com/photo-1470083748587-df49227c0505',
        gender: 'male',
        coed: 'false',
        sports_id:        knex('sports').select('id').where('type', 'Baseball')
      }),
      knex('teams').insert({
        name: 'Alcoballics',
        zip: 80207,
        image:  'https://hd.unsplash.com/photo-1470083748587-df49227c0505',
        gender: 'male',
        coed: 'false',
        sports_id:         knex('sports').select('id').where('type', 'Baseball')
      }),
      knex('teams').insert({
        name: 'Liver Let Die',
        zip: 80247,
        image: 'https://hd.unsplash.com/photo-1436076863939-06870fe779c2',
        gender: 'female',
        coed: 'false',
        sports_id:         knex('sports').select('id').where('type', 'Beer Pong')
      }),
      knex('teams').insert({
        name: 'E=MC Hammered',
        zip: 80239,
        image: 'https://hd.unsplash.com/photo-1436076863939-06870fe779c2',
        gender: 'male',
        coed: 'false',
        sports_id:         knex('sports').select('id').where('type', 'Beer Pong')
      }),
      knex('teams').insert({
        name: 'Drunk & Looking to Score',
        zip: 80227,
        image: 'https://hd.unsplash.com/photo-1436076863939-06870fe779c2',
        gender: 'female',
        coed: 'false',
        sports_id:          knex('sports').select('id').where('type', 'Beer Pong')
      }),
      knex('teams').insert({
        name: 'Trippin Balls',
        zip: 80223,
        image: 'https://hd.unsplash.com/photo-1436076863939-06870fe779c2',
        coed: 'true',
        sports_id:          knex('sports').select('id').where('type', 'Beer Pong')
      }),
      knex('teams').insert({
        name: 'Blood Sweat & Beers',
        zip: 80215,
        image: 'https://hd.unsplash.com/photo-1436076863939-06870fe779c2',
        coed: 'true',
        sports_id:          knex('sports').select('id').where('type', 'Beer Pong')
      }),
      knex('teams').insert({
        name: 'Wasted Potential',
        zip: 80249,
        image: 'https://hd.unsplash.com/photo-1436076863939-06870fe779c2',
        gender: 'male',
        coed: 'false',
        sports_id:          knex('sports').select('id').where('type', 'Beer Pong')
      }),
      knex('teams').insert({
        name: 'Chug Norris',
        zip: 80228,
        image: 'https://hd.unsplash.com/photo-1440668737548-aa725b277c81',
        coed: 'true',
        sports_id: knex('sports').select('id').where('type', 'Cornhole')
      })
    ]);
  });
};
