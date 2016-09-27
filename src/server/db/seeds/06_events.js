//done for now
const faker = require('faker');

function eventsSeed(knex) {
  var startTime = faker.random.number({min:8, max:20});
  var end = (startTime + 3);
  return knex('events').insert({
    date: dateOnly(),
    start_time: startTime,
    end_time: end,
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    locations_id: faker.random.number({min:1, max:50}),
    sports_id: faker.random.number({min:1, max:12})
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(100);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return eventsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};

function dateOnly() {
  var date = faker.date.future();
  date = date.toString().split(' ').splice(0, 4);
  return date;
}
