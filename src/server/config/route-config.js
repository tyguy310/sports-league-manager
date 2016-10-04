(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const eventRoutes = require('../routes/events');
    const playerRoutes = require('../routes/players');
    const sportRoutes = require('../routes/sports');
    const teamRoutes = require('../routes/teams');
    const ladderRoutes = require('../routes/ladders');
    const login = require('../routes/login');
    const chatRoutes = require('../routes/chat');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/events', eventRoutes);
    app.use('/players', playerRoutes);
    app.use('/sports', sportRoutes);
    app.use('/login', login);
    app.use('/teams', teamRoutes);
    app.use('/ladders', ladderRoutes);
    app.use('/chat', chatRoutes);
  };

})(module.exports);
