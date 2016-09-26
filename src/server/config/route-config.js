(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const routes = require('../routes/index');
    const authRoutes = require('../routes/auth');
    const contactRoute = require('../routes/contact');

    // *** register routes *** //
    app.use('/auth', authRoutes);
    app.use('/', routes);
    app.use('/', contactRoute);

  };

})(module.exports);
