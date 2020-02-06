const Sequelize = require('sequelize');
const _ = require('lodash');

const config = require('../../config/environment');
const logger = require('../../components/logger');

const sqlDefaults = {
  dialect: 'mysql',
  timezone: '+05:30',
  logging: config.NODE_ENV === 'development' && ((str) => {
    logger.debug(str);
  }),
  dialectOptions: {
    decimalNumbers: true,
  },
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
  },
};

const db = {
  Sequelize,
  sequelize: new Sequelize(config.MYSQL, sqlDefaults),
};

[
  'EmailTemplate', 'EmailTemplateAd', 'Ad', 'EmailPreference',
  'EmailLog', 'EmailOpen', 'EmailClick', 'EmailDelivery', 'User',
]
  .forEach((model) => {
    db[model] = db.sequelize
      .import(`../../api/${_.camelCase(model)}/${_.camelCase(model)}.model`);
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = db;
