const knex = require('./knex');
const request = require('request');

exports.getItems = (tableName, callback, itemId) => {
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

exports.deleteOne = (tableName, itemId, callback) => {
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

exports.postItem = (tableName, object, callback) => {
  knex(tableName)
  .insert(object)
  .then(result => {
    callback (null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.postLadderPlayer = (tableName, object, callback) => {
  return knex(tableName)
  .insert(object)
  .then(result => result)
  .catch(err => err);
};

exports.ladderPost = (ladderName, participantId, callback) => {
  return knex(ladderName)
  .max('rank')
  .then(result => {
    let addPlayer = {
      rank: result[0].max + 1,
      player_id: participantId
    };
    return knex(ladderName)
    .insert(addPlayer)
    .then(result => result);
  })
  .catch(err => err);
};

exports.joinPlayerToTeams = (playerId, callback) => {
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

exports.joinPlayerToSports = (playerId, callback) => {
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

exports.joinPlayerToEvents = (playerId, callback) => {
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
  .select('player_id', 'first_name', 'last_name', ` ${ladderName}.rank as rank`)
  .orderBy(`${ladderName}.rank`)
  .join('players', 'players.id', `${ladderName}.player_id`)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.joinSportToLadder = (ladderId, callback) => {
  knex('ladders')
  .select('*', 'ladders.id', 'ladders.type')
  .join('sports', 'sports.id', 'ladders.sport_id')
  .where('ladders.id', ladderId)
  .then(result => {
    callback(null, result);
  }).catch(err => {
    callback(err);
  });
};

exports.updateOne = (tableName, itemId, updateObject, callback) => {
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

exports.ladderRemovePlayer = (ladderName, playerId, callback) => {
  knex(ladderName)
  .where('player_id', playerId)
  .returning('rank')
  .del()
  .then(player => {
    const deletedRank = player[0];

    knex(ladderName)
    .where(`${ladderName}.rank`, '>', deletedRank)
    .then(players => {
      const newRanks = [];
      for (let i = 0; i < players.length; i++) {
        knex(ladderName)
        .where('rank', deletedRank + i + 1)
        .update('rank', deletedRank + i)
        .then(player => {
          return player[0];
        });
      }
    });
    callback(null, 'success');
  })
  .catch(err=> {
    callback(err);
  });
};

exports.ladderUpdate = (tableName, winnerId, loserId, callback) => {
  const updateArray = [];

  knex(tableName)
  .where('player_id', winnerId)
  .then(player => {
    const winner = player[0];
    knex(tableName)
    .where('player_id', loserId)
    .then(player => {
      const loser = player[0];
      if (winner.rank < loser.rank) {
        const tryAgain = 'Challenger Lost';
        updateArray.push({message: tryAgain});
        callback(null, updateArray);
      } else {
        const winnerRank = loser.rank;

        knex(tableName)
        .where('player_id', winnerId)
        .update('rank', winnerRank)
        .then(playerOne => {
          updateArray.push({rank: winnerRank, player_id:`${winnerId}`});
          const loserRank = winner.rank;

          knex(tableName)
          .where('player_id', loserId)
          .update('rank', loserRank)
          .then(playerTwo => {
            updateArray.push({rank: loserRank, player_id:`${loserId}`});
            callback(null, updateArray);
          });
        });
      }
      return updateArray;
    });
  })
  .catch(err=> {
    callback(err);
  });
};

exports.getWeather = (zip, callback) => {
  const WEATHER_URL = 'https://api.wunderground.com/api/903be07b671ce816/conditions/q/' + zip + '.json';
  request(WEATHER_URL, (error, response, result) => {
    if (error) {
      callback(error);
    } else {
      callback(null, result);
    }
  });
};
