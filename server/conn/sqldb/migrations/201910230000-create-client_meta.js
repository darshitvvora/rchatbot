const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('client_meta', Object.assign(
      properties('clientMeta', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        client_id: keys('clients'),
      },
    ), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('client_meta');
  },
};
