/* eslint no-process-env:0 */
const path = require('path');
const dotenv = require('dotenv');
const _ = require('lodash');
const shared = require('./shared');

const root = path.normalize(`${__dirname}/../../..`);

const env = dotenv.config({ path: path.join(root, '.env') }).parsed;
const { DOMAIN, PREFIX } = env;

const all = {
  env: env.NODE_ENV,
  root,
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3002,
  port: process.env.PORT || 3302,
  ip: process.env.IP || '0.0.0.0',
  MINIO: {
    minio: {
      endPoint: env.MINIO_ENDPOINT,
      accessKey: env.MINIO_ACCESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
      // secure: process.env.NODE_ENV !== 'development',
      useSSL: process.env.NODE_ENV !== 'development',
      port: +env.MINIO_PORT || 443,
    },
    errorFileUrl: `${env.PREFIX}extension.${env.DOMAIN}/api/404.pdf`,
    bucket: 'quezx',
  },
  URLS_EXTENSION: `${PREFIX}extension.${DOMAIN}`,
};

module.exports = _.merge(
  all,
  env,
  shared || {},
);
