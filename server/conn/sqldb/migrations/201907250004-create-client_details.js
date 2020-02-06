const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('client_details', Object.assign(
      properties('clientDetail', DataTypes),
      timestamps(['u'], DataTypes),
      {
        client_id: keys('clients'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('client_details');
  },
};
