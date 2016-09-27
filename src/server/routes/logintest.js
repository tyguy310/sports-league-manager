const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {
  var renderObject = {};
  renderObject.title = 'test';
  res.render('logintest', renderObject);
});

module.exports = router;
