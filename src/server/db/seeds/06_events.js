//done for now
const faker = require('faker');

function eventsSeed(knex) {
  var startTime = faker.random.number({min:8, max:20});
  var end = (startTime + 3);
  return knex('events').insert({
    date: faker.date.future(),
    start_time: startTime,
    end_time: end,
    name: ('Sports Game #' + faker.random.number({min:1, max:900})),
    description: faker.lorem.sentence(),
    locations_id: faker.random.number({min:1, max:5}),
    sports_id: faker.random.number({min:1, max:11})
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(40);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return eventsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
