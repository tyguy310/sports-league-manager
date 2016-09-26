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

module.exports = router;
