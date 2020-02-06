const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const url = require('url');

const root = path.normalize(`${__dirname}/../..`);
const envFile = path.join(root, '.env');

let config = {};
let env = {};

if (fs.existsSync(envFile)) {
  env = dotenv.config({ path: envFile });
  config = env.parsed || env;
}

process.env.NODE_ENV = config.NODE_ENV || process.env.NODE_ENV || 'production';

const conn = url.parse(config.MYSQL_EXTENSION);
const [username, password] = conn.auth.split(':');

const [host, port] = conn.hostname.split(':');

const settings = {
  database: conn.pathname.slice(1) || 'gloryque_verify',
  username: username || 'root',
  password: password || '',
  dialect: 'mysql',
  host: host || '127.0.0.1',
  port: port || 3306,
  seederStorage: 'sequelize',
};

module.exports = {
  development: settings,
  test: settings,
  production: settings,
};
