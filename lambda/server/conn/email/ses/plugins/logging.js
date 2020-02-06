const logger = require('../../../../components/logger');

let db;
const requireNow = require;

exports.start = ([params]) => Promise.resolve([params, {}]);

exports.end = ([params, emailLog]) => {
  if (!db) db = requireNow('../../../../conn/sqldb');
  db.EmailLog.create(emailLog).catch(err => logger.error('saving email logs', err, params));
  return Promise.resolve([params, emailLog]);
};
