const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  queries.getItems('sports', function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'An error occurred, please try again'
      });
    } else {
      res.json({
        sports: result
      });
    }
  });
});

router.get('/:id', function (req, res, next) {
  let sportId = req.params.id;
  queries.getItems('sports', function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'Sport not found.'
      });
    } else {
      res.json({
        sport: result
      });
    }
  }, sportId);
});

router.get('/mysports/:id', function (req, res, next) {
  let playerId = req.params.id;
  queries.joinPlayerToSports(playerId, function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'No sports found for that player'
      });
    } else {
      res.json({
        sports: result
      });
    }
  });
});

module.exports = router;
