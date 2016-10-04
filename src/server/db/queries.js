const knex = require('./knex');
const request = require('request');

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
  } else if (tableName === 'events') {
    knex(tableName)
    .orderBy('date', 'asc')
    .then(results => {
      callback(null, results);
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

exports.verify = (req, res, next) => {
  var err = new Error ('Wrong Token or ID');
  if (req.headers.auth_token === req.params.id) {
    var nextvariable;
    knex('players')
    .where('players.id', req.headers.auth_token)
    .then(result => {
      if (result.length) {
        nextvariable = next();
        return result;
      }
      else {
        nextvariable = next(err);
      }
    }).catch(err => {
      nextvariable = next(err);
    });
    return nextvariable;
  }
  else {
    return next(err);
  }
};

exports.login = (eMail, user_name, callback) => {
  var where;
  if (eMail) {
    where = {email: eMail};
  }
  else {
    where = {username: user_name};
  }

  knex('players').where(where)
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
  .select('name', 'sports.image as sportImage', 'teams.image as teamImage', 'zip', 'teams.gender', 'coed', 'type')
  .join('players', 'players.id', '=', 'players_teams.players_id')
  .join('teams', 'teams.id', '=', 'players_teams.teams_id')
  .join('sports', 'teams.sports_id', '=', 'sports.id')
  .where('players.id', '=', playerId)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.joinPlayerToSports = function(playerId, callback) {
  knex('players_sports')
  .select('type')
  .join('players', 'players.id', '=', 'players_sports.players_id')
  .join('sports', 'sports.id', '=', 'players_sports.sports_id')
  .where('players.id', '=', playerId)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.getEventsSuperTable = (callback, eventId) => {
  if (eventId) {
    knex('sports')
    .select('*', 'events.id as eventId')
    .join('events', 'events.sports_id', 'sports.id')
    .join('locations', 'locations.id', 'events.locations_id')
    .where('events.id', '=', eventId)
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
    knex('events')
    .select('*', 'events.id as eventId')
    .join('locations', 'locations.id', 'events.locations_id')
    .join('sports', 'sports.id', 'events.sports_id')
    .then(result => {
      callback(null, result);
    }).catch(err => {
      callback(err);
    });
  }
};

exports.joinPlayerToEvents = function(playerId, callback) {
  knex('players_events')
  .orderBy('date', 'asc')
  .select('date', 'start_time', 'end_time', 'name', 'description')
  .join('players', 'players.id', '=', 'players_events.player_id')
  .join('events', 'events.id', '=', 'players_events.event_id')
  .where('players.id', '=', playerId)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.joinPlayersToLadder = (ladderName, callback) => {
  knex(ladderName)
  .select('*', ` ${ladderName}.id as rank`)
  .join('players', 'players.id', `${ladderName}.player_id`)
  .then(result => {
    callback(null, result);
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

// exports.ladderUpdate = (tableName, playerOneId, playertwoId, callback) => {
//   let updatedPlayer = {};
//   knex(tableName)
//   .where('id', playerOneId)
//   .then(player => {
//     for (let key in updateObject) {
//       if (updateObject[key] === null) {
//         updatedPlayer[key] = player[key];
//       } else {
//         updatedPlayer[key] = updateObject[key];
//       }
//     }
//     knex(tableName)
//     .where('id', itemId)
//     .update(updatedPlayer)
//     .then(result => {
//       callback(null, result);
//     });
//   }).catch(err=> {
//     callback(err);
//   });
// };

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
