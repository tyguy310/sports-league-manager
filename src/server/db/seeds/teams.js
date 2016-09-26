const faker = require('faker');

function randomGender() {
  var gender;
  genderNum = (Math.floor(Math.random() * 2) + 1 )
  if (genderNum = 1) {
    gender = male
  } else {
    gender = female
  }
  return gender
};

function teamsSeed(knex) {
  return knex('teams').insert({
    name: (faker.hacker.ingverb + ' ' + faker.hacker.noun + 's')
    image: faker.image.animals,
    zip: (80000 + (Math.floor(Math.random() * 20) + 1)),
    gender: randomGender(),
    coed: faker.random.boolean()

    // table.string('name').notNullable();
    // table.string('image').notNullable();
    // table.string('zip').notNullable().unique();
    // table.string('gender').notNullable();
    // table.boolean('coed').notNullable();
    // table.integer('players_id').notNullable();
    // table.foreign('players_id').references('id').inTable('players');
    // table.integer('sports_id').notNullable();
    // table.foreign('sports_id').references('id').inTable('sports');
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
