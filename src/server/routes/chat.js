const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/:id', function (req, res, next) {
  let userId = req.params.id;
  queries.getItems('players', function (err, result) {
    if (err) {
      res.json({
        error: err.message || 'An issue occurred while connecting to chat.'
      });
    } else {
      let username = result[0].username;
      res.json({
        username: username
      });
    }
  }, userId);
});

module.exports = router;
