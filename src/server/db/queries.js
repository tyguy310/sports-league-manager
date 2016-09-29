/* globals $ */
const knex = require('./knex');
const request = require('request');

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

exports.login = (email, callback) => {
  knex('players')
  .where('email', email)
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

exports.joinAccountPlayer = (playerId, callback) => {
  knex('players')
  .select('first_name', 'last_name', 'email', 'profile_picture', 'username', 'tagline', 'zip_code', 'availability', 'gender', 'is_user', 'is_admin')
  .join('accounts', 'accounts.id', '=', 'players.account_id')
  .where('players.id', playerId)
  .then(result => {
    callback (null, result[0]);
  })
  .catch(err => {
    callback(err);
  });
};

exports.signup = (accountObject, playerObject, callback) => {
  knex('accounts')
  .insert(accountObject)
  .returning('*')
  .then((account) => {
    playerObject.account_id = account[0].id;
    return knex('players')
    .insert(playerObject)
    .returning('id')
    .then(newPlayerId => {
      return knex('players')
      .select('players.id', 'first_name', 'last_name', 'email', 'profile_picture', 'username', 'tagline', 'zip_code', 'availability', 'gender', 'is_user', 'is_admin')
      .join('accounts', 'accounts.id', '=', 'players.account_id')
      .where('players.id', parseInt(newPlayerId))
      .then(result => {
        callback (null, result[0]);
      });
    })
    .catch(err => {
      callback(err);
    });
  });
};

exports.playerSports = (playerId, sport_name, callback) => {
  knex('sports')
  .where('type', sport_name)
  .first()
  .then(sport_id => {
    console.log(playerId);
    return knex('players_sports')
    .insert({
      players_id: playerId,
      sports_id: sport_id.id
    })
    .then(result => {
      callback (null, result);
    });
  })
  .catch(err => {
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

//AF take events -> join sports and locations
exports.joinEventsToLocationsAndSports = function (thisEventID, callback) {
  knex('events')
  .join('locations', 'locations.id', '=', 'events.locations_id')
  .join('sports', 'sports.id', '=', 'events.sports_id')
  .where('events.id', '=', thisEventID)
  .then(result => {
    callback(null, result[0]);
  }).catch(err => {
    callback(err);
  });
};

exports.joinPlayerToEvents = function(playerId, callback) {
  knex('players_events')
  .select('date', 'start_time', 'end_time', 'name', 'description')
  .join('players', 'players.id', '=', 'players_events.player_id')
  .join('events', 'events.id', '=', 'players_events.event_id')
  .where('players.id', '=', playerId)
  .then(result => {
    callback(null, result[0]);
  }).catch(err => {
    callback(err);
  });
};

exports.updateOne = function(tableName, itemId, updateObject, callback) {
  let updatedPlayer = {};
  knex(tableName)
  .where('id', itemId)
  .then(player => {
    for (let key in updateObject) {
      if (updateObject[key] === null) {
        updatedPlayer[key] = player[key];
      } else {
        updatedPlayer[key] = updateObject[key];
      }
    }
    knex(tableName)
    .where('id', itemId)
    .update(updatedPlayer)
    .then(result => {
      callback(null, result);
    });
  }).catch(err=> {
    callback(err);
  });
};

//feed this function a zip code to pull the weather at that location
exports.getWeather = function(zip, callback) {
  const WEATHER_URL = 'https://api.wunderground.com/api/903be07b671ce816/conditions/q/' + zip + '.json';
  request(WEATHER_URL, function(error, response, result) {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};
