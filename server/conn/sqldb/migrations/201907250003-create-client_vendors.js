const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('client_vendors', Object.assign(
      properties('clientVendor', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        client_id: keys('clients'),
        vendor_id: keys('clients'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('client_vendors');
  },
};
