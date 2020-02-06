const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('vendor_partners', Object.assign(
      properties('vendorPartner', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        vendor_id: keys('clients'),
        partner_vendor_id: keys('clients'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('vendor_partners');
  },
};
