const knex = require('./knex');

// If no itemId is provided, function gets all items from given table. Otherwise it gets only the one that matches that id.

exports.getItems = function(tableName, callback, itemId) {
  if (itemId) {
    knex(tableName)
    .where('id', itemId)
    .then(result => {
      if (result.length) {
        callback(null, result);
      }
      else {
        callback(1);
      }
    }).catch(err => {
      callback(err);
    });
  } else {
    knex(tableName)
    .then(results => {
      callback(null, results);
    }).catch(err => {
      callback(err);
    });
  }
};

//Deletes a single item from the given table name.

exports.deleteOne = function (tableName, itemId, callback) {
  knex(tableName)
  .del()
  .where('id', itemId)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

//Allows us to post to any table by creating an object in the route and passing it into this function.

exports.postItem = function (tableName, object, callback) {
  knex(tableName)
  .insert(object)
  .then(result => {
    callback (null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.joinPlayerToTeams = function(playerId, callback) {
  knex('players_teams')
  .select('name', 'image', 'zip', 'teams.gender', 'coed')
  .join('players', 'players.id', '=', 'players_teams.players_id')
  .join('teams', 'teams.id', '=', 'players_teams.teams_id')
  .where('players.id', '=', playerId)
  .then(result => {
    callback(null, result[0]);
  }).catch(err => {
    callback(err);
  });
};
