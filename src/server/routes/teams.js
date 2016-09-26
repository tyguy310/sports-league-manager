const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  queries.getItems('teams', function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'An error occurred, please try again.'
      });
    } else {
      res.json({
        teams: result
      });
    }
  });
});

router.get('/:id', function (req, res, next) {
  let teamId = req.params.id;
  queries.getItems('teams', function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'No team found.'
      });
    } else {
      res.json({
        team: result
      });
    }
  });
});

router.get('/myteams/:id', function (req, res, next) {
  let playerId = req.params.id;
  queries.joinPlayerToTeams(playerId, function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'No teams found for that player.'
      });
    } else {
      res.json({
        teams: result
      });
    }
  });
});

router.post('/', function (req, res, next) {
  let renderObject = {};
  let newTeam = {
    name: req.body.name,
    image: req.body.image,
    zip: req.body.zip,
    gender: req.body.gender,
    coed: req.body.coed,
    sports_id: req.body.sports_id
  };
  queries.postItem('teams', newTeam, function (err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, there was an issue creating that team. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.player = result;
      res.json({
        team: renderObject
      });
    }
  });
});

module.exports = router;
