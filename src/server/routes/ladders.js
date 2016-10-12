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
  console.log(ladderName);
  queries.joinPlayersToLadder(ladderName, (err, result) => {
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

router.post('/register', (req, res, next) => {
  const playerId = req.body.player_id;
  const ladderName = req.body.table_name;
  const ladderId = req.body.ladder_id;
  const addPlayer = {
    player_id: playerId,
    ladder_id: ladderId
  };

  let allLadders = Promise.resolve(queries.postLadderPlayer('ladders_players', addPlayer, (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    })
  );

  let playerAdd = Promise.resolve(queries.ladderPost(ladderName, playerId, (err, result) => {
      if (err) {
        return err;
      } else {
        return result;
      }
    })
  );

  Promise.all([allLadders, playerAdd])
  .then(results => {
    console.log(results);
    res.json(results);
  })
  .catch(err => err);
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

router.delete('/ladder/:ladder_name/:player_id', (req, res, next) => {
  const ladderName = req.params.ladder_name;
  const playerId = req.params.player_id;

  queries.ladderRemovePlayer(ladderName, playerId, (err, result) => {
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
