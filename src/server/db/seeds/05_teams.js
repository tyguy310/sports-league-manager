const faker = require('faker');

function randomGender() {
  var genderNum = (Math.floor(Math.random() * 2) + 1);
  if (genderNum === 1) {
    return 'male';
  } else {
    return 'female';
  }
}

function randomPicture() {
  var picNum = (Math.floor(Math.random() * 4) + 1);
  if (picNum === 1) {
    return 'http://www.hicelebration.com/images/landing-pages/groups/sports-teams.jpg';
  } else if (picNum === 2) {
    return 'http://www.brandtschool.de/fileadmin/_migrated/pics/Fussballteam.JPG';
  } else if (picNum === 3) {
    return 'http://theberrics.com/media/video/cache/1/cached_thumbnail/700x400/af097278c5db4767b0fe9bb92fe21690/cached_thumbnail/p/r/promo280110723.jpg';
  } else {
    return 'http://www.cloggingcontest.com/INimages/2013%20Winners/power-outage-overall-amateur-adult-team.jpg';
  }
}

function teamsSeed(knex) {
  return knex('teams').insert({
    name: (faker.hacker.ingverb() + ' ' + faker.hacker.noun() + 's'),
    image: randomPicture(),
    zip: (80000 + (Math.floor(Math.random() * 20) + 1)),
    gender: randomGender(),
    coed: faker.random.boolean(),
    sports_id: faker.random.number({min:1, max:11})
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
