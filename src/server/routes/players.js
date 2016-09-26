const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.post('/', function (req, res, next) {
  let renderObject = {};
  let newPlayer = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    profile_picture: req.body.profile_picture || null,
    username: req.body.username,
    password: req.body.password,
    tagline: req.body.tagline || null,
    zip_code: req.body.zip_code,
    availability: req.body.availability || 36,
    gender: req.body.gender || null
  };
  queries.postItem ('players', newPlayer, function(err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, there was an issue creating that account. Please try again.';
      res.render('error', renderObject);
    } else {
      renderObject.player = result;
      res.render('player_profile', renderObject);
    }
  });
});

router.get('/:id', function (req, res, next) {
  let playerId = req.params.id;
  let renderObject = {};
  queries.getItems('players', function(err, result) {
    if (err) {
      renderObject.message = err.message || 'We were unable to find that profile. Please try again.';
      res.render('error', renderObject);
    } else {
      renderObject.player = result;
      res.render('player_profile', renderObject);
    }
  }, playerId);
})
