const WebHooks = require('node-webhooks');
const { root } = require('../../../lambda/server/config/environment/index');
const logger = require('../../../lambda/server/components/logger');

const hookshot = new WebHooks({
  db: `${root}/subscriptions.json`,
  DEBUG: true,
});

const emitter = hookshot.getEmitter();

emitter.on('*.*', (shortname, statusCode, body) => {
  if (![200, 201].includes(statusCode)) {
    logger.error('trigger webHook', shortname, 'with status code', statusCode, 'and body', body);
  }
});

module.exports = hookshot;
