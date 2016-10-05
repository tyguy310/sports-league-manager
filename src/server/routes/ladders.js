const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req, res, next) => {
  const renderObject = {};
  queries.getItems('ladders', (err, result) => {
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

router.get('/:id', (req, res, next) => {
  const renderObject = {};
  const itemId = req.params.id;
  queries.getItems('ladders', (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that ladder. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.ladder = result[0];
      res.json(renderObject);
    }
  }, itemId);
});

router.get('/ladder/:ladder_name', (req, res, next) => {
  const renderObject = {};
  const ladderName = req.params.ladder_name;
  queries.joinPlayersToLadder(`${ladderName}`, (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that ladder. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.ladder = result;
      res.json(renderObject);
    }
  });
});

router.post('/ladder/:ladder_name/:player_id', (req, res, next) => {
  const playerId = req.params.player_id;
  const ladderName = req.params.ladder_name;

  queries.ladderPost(ladderName, playerId, (err, result) => {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
});

router.put('/ladder/:ladder_name/:winner_id/:loser_id', (req, res, next) => {
  const winnerId = req.params.winner_id;
  const loserId = req.params.loser_id;
  const ladderName = req.params.ladder_name;

  queries.ladderUpdate(ladderName, winnerId, loserId, (err, result) => {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
});

// delete route - query needs to get rank of targeted deletion, delete, then
// update all lower ranked players up by 1 rank.

router.delete('/ladder/:ladder_name/:player_id', (req, res, next) => {
  const ladderName = req.params.ladder_name;
  const playerId = req.params.player_id;

  queries.ladderDelete(ladderName, playerId, (err, result) => {
    if (err) {
      res.json({
        error: err
      });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
