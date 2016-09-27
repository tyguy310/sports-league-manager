(function() {

  'use strict';

  // *** main dependencies *** //
  var express = require('express');
  var path = require('path');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  const appConfig = require('./config/main-config.js');
  const routeConfig = require('./config/route-config.js');
  const errorConfig = require('./config/error-config.js');
  const cors = require('cors');

  // *** config file *** //
  var config = require('./../../_config');

  // *** routes *** //
  var authRoutes = require('./routes/auth');

  // *** express instance *** //
  const app = express();
  app.use(cors());

  // *** config *** //
  appConfig.init(app, express);
  routeConfig.init(app);
  errorConfig.init(app);

  // *** config middleware *** //
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../client')));

  // *** main routes *** //
  app.use('/auth', authRoutes);

  // *** handle 404 error *** //
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // *** error handlers *** //
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      var status = err.status || 500;
      res.status(status).send({
        message: err.message,
        error: err
      });
    });
  }
  app.use(function(err, req, res, next) {
    var status = err.status || 500;
    res.status(status).send({
      message: err.message,
      error: err
    });
  });

  module.exports = app;

}());
