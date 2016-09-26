//done for now
const faker = require('faker');

function locationsSeed(knex) {
  return knex('locations').insert({
    location_name: faker.random.locale(),
    location_image: faker.image.sports(),
    location_description: faker.lorem.sentence(),
    loc_add_line_1: faker.address.streetAddress(),
    loc_add_city: faker.address.city(),
    loc_add_state: faker.address.state(),
    loc_add_zip: faker.address.zipCode().split('-')[0],
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(100);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return locationsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
