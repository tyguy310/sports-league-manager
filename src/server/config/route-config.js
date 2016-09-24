(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const eventRoutes = require('../routes/events');

    // *** register routes *** //
    app.use('/', routes);
    app.use('/events', eventRoutes);

  };

})(module.exports);
