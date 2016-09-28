
function playersEventsSeed(knex) {
  return knex('players_teams').insert({
    //  Insert seed data here
  });
}

exports.seed = function (knex, Promise) {
  const iterationArray = new Array(100);

  var ArrayOfPromises = Array.from(iterationArray)
  .map(() => {
    return playersEventsSeed(knex);
  });

  return Promise.all(ArrayOfPromises);
};
