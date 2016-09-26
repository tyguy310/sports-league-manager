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

module.exports = router;
