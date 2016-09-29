const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  console.log(req.headers);
  let renderObject = {};
  queries.getItems('events', function(err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue loading all of our events. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.events = result;
      res.json({
        events: renderObject,
        test: req.headers.Auth_Token
      });
    }
  });
});

router.get('/:id', function (req, res, next) {
  let renderObject = {};
  let itemId = req.params.id;
  queries.getItems('events', function (err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.event = result;
      res.json({
        event: renderObject
      });
    }
  }, itemId);
});

router.post('/', (req, res, next) => {
  let renderObject = {};
  let newEvent = {
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    name: req.body.name,
    description: req.body.description,
    locations_id: req.body.locations_id,
    sports_id: req.body.sports_id
  };
  queries.postItem ('events', newEvent, (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, there was an issue creating that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.event = result;
      res.json({
        event: renderObject
      });
    }
  });
});

router.delete('/:id', (req, res, next) => {
  let renderObject = {};
  let itemId = req.params.id;
  queries.deleteOne('events', itemId, (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.event = result;
      res.json({
        event: renderObject
      });
    }
  });
});

router.get('/myevents/:id', function (req, res, next) {
  let playerId = req.params.id;
  queries.joinPlayerToEvents(playerId, function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'No events found for that player.'
      });
    } else {
      res.json({
        events: result
      });
    }
  });
});

//AF route that selects an event and shows what sport it is and where it's located
router.get('/showEvent/:id', function (req, res, next) {
  var thisEventID = req.params.id;
  queries.joinEventsToLocationsAndSports(thisEventID, function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'No events found for that ID.'
      });
    } else {
      res.json({
        events: result
      });
    }
  });
});

router.post('/register', function (req, res, next) {
  let newRegistration = {
    player_id: req.body.player_id,
    event_id: req.body.event_id
  };
  queries.postItem('players_events', newRegistration, function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'Sorry, there was an issue registering you for that event.'
      });
    } else {
      res.json({
        message: 'Thank you for registering!'
      });
    }
  });
});

module.exports = router;
