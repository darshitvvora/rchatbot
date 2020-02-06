const debug = require('debug');
const connection = require('./connection');
const logging = require('./plugins/logging');
const preference = require('./plugins/preference');
const advertisement = require('./plugins/advertisement');
const footer = require('./plugins/footer');
const deliver = require('./plugins/deliver');
const logger = require('../../../components/logger');

const log = debug('q-server-conn-ses-index');

const sendTemplatedEmail = (params) => {
  log('sendTemplatedEmail', params);
  return logging.start([params])
    .then(preference) // - preference check
    .then(advertisement) // - inject advertisements
    .then(footer) // - inject footer
    .then(deliver) // - handover email to aws ses
    .then(data => logging.end(data)) // - Finish log: update executation status in the table
    .catch((err) => {
      log('err', err);
      if (err.data && err.code === 400) {
        logging.end(err.data);
        return Promise.resolve(err.data);
      }

      logger.error('Error while sending templated email:', {
        error: err,
        params,
      });
      return Promise.reject(err);
    });
};

const email = {
  quarc: connection,
  sendTemplatedEmail,
  sendTemplatedEmailAsync: sendTemplatedEmail,
};

module.exports = email;
