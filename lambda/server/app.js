/**
 * Lambda application file
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const http = require('http');
const express = require('express');

const logger = require('./components/logger');

const expressConfig = require('./config/express');
const { env, ip, port } = require('./config/environment/index');

const app = express();
const server = http.createServer(app);
const { log } = console;

expressConfig(app);

// Start server
function startServer() {
  return new Promise((res, rej) => {
    if (env === 'test') return res();
    return server.listen(port, ip, (err) => {
      if (err) return rej(err);
      return res();
    });
  });
}

function connect() {
  return Promise.all([
    Promise.resolve(),
  ]).catch(err => logger.error({ e: 'Error starting', err }));
}

process.on('unhandledRejection', (reason, p) => {
  log('unhandledRejection', reason, p);
  logger.error({
    t: 'Unhandled Rejection at: Promise',
    p,
    reason,
  });
  // application specific logging, throwing an error, or other logic here
});

process.on('uncaughtException', (err) => {
  log('uncaughtException', err);
  logger.error({ u: 'uncaughtException', err });
});

app.loadComplete = connect().then(startServer);

app.loadComplete.then(() => {
  logger.info('API: Express server listening on %d, in %s mode', port, app.get('env'));
});
// Expose app
module.exports = app;
