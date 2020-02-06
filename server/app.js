/**
 * Main application file
 */


const express = require('express');
const http = require('http');

const config = require('./config/environment');
const db = require('./conn/sqldb');

// Setup src
const app = express();
const server = http.createServer(app);
/*
Enable this for enabling socket in your project
const socketio = require('socket.io')(src, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
*/

require('./config/express')(app);
require('./routes')(app);
const logger = require('./components/logger');

// Start src
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, () => {
    logger.log('Server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  logger.error('uncaughtException', err);
});

db.sequelizeVerify
  .authenticate()
  .then(startServer)
  .catch((err) => {
    logger.error('Server failed to start due to error: %s', err);
  });

// Expose app
module.exports = app;
