const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  res.redirect('/events');
});

module.exports = router;
