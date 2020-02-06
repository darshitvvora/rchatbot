/**
 * Main application routes
 */

const path = require('path');

const errors = require('./components/errors');
const { name, version } = require('../package.json');
const logger = require('./components/logger');
const authenticate = require('./components/oauth/authenticate');
const caseRoute = require('./api/case');
const userRoute = require('./api/user');
const clientRoute = require('./api/client');

module.exports = (app) => {
  // Insert routes below
  app.get('/api/health', (req, res) => res.json({ name, version }));
  app.use('/api/user', authenticate(), userRoute);
  app.use('/api/client', authenticate(), clientRoute);
  app.use('/api/case', authenticate(), caseRoute);

  app.use(app.express.static(app.get('appPath')));

  app.use(logger.transports.sentry.raven.errorHandler());

  // All undefined asset or api routes should return a 404
  // eslint-disable-next-line no-unused-vars
  app.use((e, req, res, next) => {
    logger.error(e);
    return (res.status(e.statusCode || e.code || 500)
      .json({ message: e.message, stack: e.stack }));
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the app.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
};
