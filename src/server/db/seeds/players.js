//done for now
const faker = require('faker');

function randomZip() {

}

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

function playersSeed(knex) {
  return knex('players').insert({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    profile_picture: faker.image.avatar(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    tagline: faker.lorem.sentence(),
    zip_code: (80000 + (Math.floor(Math.random() * 20) + 1)),
    availability: (" " + (Math.floor(Math.random() * 3) + 1) + (Math.floor(Math.random() * 3) + 4)),
    gender: randomGender(),
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(200);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return playersSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
