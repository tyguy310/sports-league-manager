const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', function (req, res, next) {
  let renderObject = {};
  queries.getItems('events', function(err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue loading all of our events. Please try again.';
      res.render('error', renderObject);
    } else {
      renderObject.events = result;
      res.render('events', renderObject);
    }
  });
});

router.get('/:id', function (req, res, next) {
  let renderObject = {};
  let itemId = req.params.id;
  queries.getItems('events', function (err, result) {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.render('error', renderObject);
    } else {
      renderObject.event = result;
      res.render('single', renderObject);
    }
  });
});
