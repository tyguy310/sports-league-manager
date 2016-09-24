(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const eventRoutes = require('../routes/events');
    const playerRoutes = require('../routes/players');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/events', eventRoutes);
    app.use('/players', playerRoutes);

  };

})(module.exports);
