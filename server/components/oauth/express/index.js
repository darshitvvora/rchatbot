
const authorise = require('./authorise');
const authenticate = require('./../authenticate');
const oAuth = require('./../');
const cronAuth = require('../../cronAuth');

module.exports = (a) => {
  const app = a;
  app.oauth = oAuth;

  // OAuth Token authorization_code, password, refresh_token
  app.all('/oauth/token', app.oauth.grant());

  app.post(
    '/api/authorise', authenticate(),
    app.oauth.authCodeGrant((req, callback) => {
      if (req.body.allow !== 'true') return callback(null, false);
      return callback(null, true, req.user);
    }),
  );

  // OAuth Authorise from Third party applications
  app.get('/authorise', authorise);

  app.post(
    '/authorise', cronAuth(), authenticate(),
    app.oauth.authCodeGrant((req, callback) => {
      if (req.body.allow !== 'true') return callback(null, false);
      return callback(null, true, req.user);
    }),
  );

  app.use(app.oauth.errorHandler());
};
