const faker = require('faker');

function randomGender() {
   const genderNum = (Math.floor(Math.random() * 2) + 1 );
  if (genderNum === 1) {
    return 'male';
  } else {
    return 'female';
  }
}

function teamsSeed(knex) {
  return knex('teams').insert({
    name: (faker.hacker.ingverb() + ' ' + faker.hacker.noun() + 's'),
    image: faker.image.animals(),
    zip: (80000 + (Math.floor(Math.random() * 20) + 1)),
    gender: randomGender(),
    coed: faker.random.boolean(),
    players_id: faker.random.number({min:1, max:200}),
    sports_id: faker.random.number({min:1, max:12}),
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(50);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return teamsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
