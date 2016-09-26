const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
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
        events: renderObject
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

module.exports = router;
