const oAuth = require('./');

/* eslint-disable no-param-reassign */

// const db = require('../../conn/sqldb');
// const sessionLog = require('../../components/sessionLogger/sessionLogger');
//
// const sessionLogger = sessionLog({ db: db.Session, sessionTime: 30 });

module.exports = () => (req, res, next) => {
  if (req.user) return next();
  return oAuth.authorise()(req, res, async (data) => {
    // await sessionLogger(req, res);

    if (req.user) {
      req.user.app_id = req.oauth.bearerToken.app_id;
      req.user.user_type = req.oauth.bearerToken.user_type;
    }

    return next(data);
  });
};
