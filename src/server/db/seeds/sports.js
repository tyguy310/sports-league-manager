
const faker = require('faker');

function sportsSeed(knex) {
  return knex('sports').insert({
    type: soccer, team_capacity: 11
  } {
    type: ping pong, team_capacity: 2
  } {
    type: basketball, team_capacity: 8
  } {
    type: soccer, team_capacity: 11
  } {
    type: badminton, team_capacity: 2
  } {
    type: flag football, team_capacity: 14
  } {
    type: kickball, team_capacity: 12
  } {
    type: softball, team_capacity: 10
  } {
    type: baseball, team_capacity: 14
  } {
    type: beer pong, team_capacity: 2
  } {
    type: soccer, team_capacity: 11
  } {
    type: hockey, team_capacity: 8
  });
};

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(1);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return sportsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
