(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const authRoutes = require('../routes/auth');

    // *** register routes *** //
    app.use('/auth', authRoutes);
    app.use('/', routes);

  };

})(module.exports);
