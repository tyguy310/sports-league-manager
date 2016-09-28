const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const queries = require('../db/queries');

router.post('/', function (req, res, next) {
  let renderObject = {};
  let password = req.body.password;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  let accountObject = {
    is_user: req.body.is_user,
    is_admin: req.body.is_admin
  };

  let playerObject = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    profile_picture: req.body.profile_picture || null,
    username: req.body.username,
    password: hash,
    tagline: req.body.tagline || null,
    zip_code: req.body.zip_code,
    availability: req.body.availability || 36,
    gender: req.body.gender || null
  };
  queries.signup(accountObject, playerObject, (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, there was an issue creating that account. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject = result;
      res.json(renderObject);
    }
  });
});

//AF This will be an object or an array of sports IDs that have to be joined to the player. populates players_sports join table
//
// let playerSportsObject = {
//   sports_names: req.body.sports
// }
//join

router.get('/:id', function (req, res, next) {
  let playerId = req.params.id;
  let renderObject = {};
  queries.getItems('players', function(err, result) {
    if (err) {
      renderObject.message = err.message || 'We were unable to find that profile. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.player = result;
      res.json({
        player: renderObject
      });
    }
  }, playerId);
});

router.put('/:id', function (req, res, next) {
  let playerId = req.params.id;
  let updateObject = {
    first_name: req.body.first_name || null,
    last_name: req.body.last_name || null,
    email: req.body.email || null,
    profile_picture: req.body.profile_picture || null,
    username: req.body.username || null,
    password: req.body.password || null,
    tagline: req.body.tagline || null,
    zip_code: req.body.zip_code || null,
    availability: req.body.availability || null,
    gender: req.body.gender || null
  };
  queries.updateOne('players', playerId, updateObject, function(err, result) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json({
        message: result
      });
    }
  });
});

module.exports = router;
