const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const root = path.normalize(`${__dirname}/..`);
const envFile = path.join(root, '.env');
let config = {};

if (fs.existsSync(envFile)) {
  const env = dotenv.config({ path: envFile });
  config = env.parsed || env;
}

process.env.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || 'test';
const settings = {
  database: config.QUARC_MYSQL_DB,
  username: config.QUARC_MYSQL_USER,
  password: config.QUARC_MYSQL_PASS,
  dialect: 'mysql',
  host: config.QUARC_MYSQL_HOST,
  port: 3306,
  seederStorage: 'sequelize',
};

module.exports = {
  development: settings,
  test: settings,
  production: settings,
};
