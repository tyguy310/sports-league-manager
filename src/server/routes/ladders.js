const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  let renderObject = {};
  queries.getItems('ladders', function(err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue loading all of our ladders. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.ladders = result;
      res.json({
        ladders: renderObject
      });
    }
  });
});

router.get('/:id', function (req, res, next) {
  let renderObject = {};
  let itemId = req.params.id;
  queries.getItems('ladders', (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.ladder = result[0];
      res.json(renderObject);
    }
  }, itemId);
});

router.get('/ladder/:ladder_name', function (req, res, next) {
  let renderObject = {};
  let ladderName = req.params.ladder_name;
  queries.joinPlayersToLadder(`${ladderName}`, (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.ladder = result;
      res.json(renderObject);
    }
  });
});

router.put('/ladder/:ladder_name/:one_id/:two_id', function (req, res, next) {
  let playerOneId = req.params.one_id;
  let playertwoId = req.params.two_id;
  let ladderName = req.params.ladder_name;
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
  queries.ladderUpdate(`${ladderName}`, playerOneId, playertwoId, function(err, result) {
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
