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
        events: renderObject,
        test: req.headers.Auth_Token
      });
    }
  });
});

router.get('/super_table', function (req, res, next) {
  let renderObject = {};
  queries.getEventsSuperTable(function(err, result) {
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

router.get('/locations', function (req, res, next) {
  queries.getItems('locations', function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'There was an issue retrieving all locations.'
      });
    } else {
      res.json({
        locations: result
      });
    }
  });
});

function map (line_1, city, state, zip) {
  return encodeURI(`${line_1}, ${city}, ${state}, ${zip}`);
}

router.get('/super_table/:id', function (req, res, next) {
  let renderObject = {};
  let eventId = req.params.id;
  queries.getEventsSuperTable((err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      const address = result[0].loc_add_line_1;
      const city = result[0].loc_add_city;
      const state = result[0].loc_add_state;
      const zip = result[0].loc_add_zip;
      renderObject.event = result;
      renderObject.event[0].mapURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyD3nHjd0_RGDNdjaWEqsfJpcNn7WD3osic&q=${map(address, city, state, zip)}`;
      res.json(renderObject);
    }
  }, eventId);
});

router.get('/:id', function (req, res, next) {
  let renderObject = {};
  let itemId = req.params.id;
  queries.getItems('events', (err, result) => {
    if (err) {
      renderObject.message = err.message || 'Sorry, we had an issue finding that event. Please try again.';
      res.json({
        error: renderObject
      });
    } else {
      renderObject.event = result;
      res.json({
        event: result
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

//get the weather at an event from the event's zip code
router.get('/weather/:zip', function (req, res, next) {
  let zip = req.params.zip;
  queries.getWeather(zip, function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'Something went wrong while we were fetching the weather.'
      });
    } else {
      res.json({
        weather: result
      });
    }
  });
});

module.exports = router;
