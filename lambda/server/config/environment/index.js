const path = require('path');
const dotenv = require('dotenv');

const root = path.normalize(`${__dirname}/../../..`);

const env = dotenv.config({ path: path.join(root, '.env') });

const config = {
  all: {
    env: env.NODE_ENV,
    port: env.PORT || 4002,
    ip: env.IP || '0.0.0.0',
    root,
    MINIO: {
      minio: {
        endPoint: env.MINIO_ENDPOINT,
        accessKey: env.MINIO_ACCESS_KEY,
        secretKey: env.MINIO_SECRET_KEY,
        // secure: process.env.NODE_ENV !== 'development',
        useSSL: process.env.NODE_ENV !== 'development',
        port: +env.MINIO_PORT || 443,
      },
      errorFileUrl: `${env.PREFIX}verify.${env.DOMAIN}/api/404.pdf`,
      bucket: 'quezx',
    },
  },
  development: {

  },
  test: {

  },
};

const conf = Object.assign(env, config.all, config[process.env.NODE_ENV || 'development']);

module.exports = conf;
