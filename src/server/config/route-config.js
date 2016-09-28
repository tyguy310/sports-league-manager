(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const eventRoutes = require('../routes/events');
    const playerRoutes = require('../routes/players');
    const sportRoutes = require('../routes/sports');
    const teamRoutes = require('../routes/teams');
    const facebook = require('../routes/logintest');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/events', eventRoutes);
    app.use('/players', playerRoutes);
    app.use('/sports', sportRoutes);
    app.use('/teams', teamRoutes);
    app.use('/logintest', facebook);
  };

})(module.exports);
