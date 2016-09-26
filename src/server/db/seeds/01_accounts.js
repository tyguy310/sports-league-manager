
const faker = require('faker');

function accountsSeed(knex) {
  return knex('accounts').insert({
    // faker functions go here
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(100);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return accountsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
