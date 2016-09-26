//done for now
const faker = require('faker');

function eventsSeed(knex) {
  return knex('events').insert({
    date: faker.date.between('2016-10-27', '2017-03-31'),
    start_time: faker.random.number({min:8, max:20}),
    end_time: (start_time + 3),
    name: faker.commerce.productName(),
    description: faker.lorem.sentence()

    // table.string('date').notNullable();
    // table.string('start_time').notNullable();
    // table.string('end_time').notNullable().unique();
    // table.string('name').notNullable();
    // table.string('description').notNullable();
    // table.integer('locations_id').notNullable();
    // table.foreign('locations_id').references('id').inTable('locations');
    // table.integer('sports_id').notNullable();
    // table.foreign('sports_id').references('id').inTable('sports');
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
