const Sequelize = require('sequelize');

const config = require('../../config/environment');
const oauthComponent = require('../../components/oauth/sequelize');

const sqlDefaults = {
  dialect: 'mysql',
  timezone: '+05:30',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8mb4_general_ci',
    },
  },
};

const auth = {
  Sequelize,
  sequelize: new Sequelize(config.ACCOUNTS_MYSQL, sqlDefaults),
};

oauthComponent(auth);

module.exports = auth;
