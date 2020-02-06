const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sub_vendor_agreements', Object.assign(
      properties('subVendorAgreement', DataTypes),
      timestamps([], DataTypes),
      {
        vendor_id: keys('clients'),
        sub_vendor_id: keys('clients'),
        sub_case_template_id: keys('sub_case_templates'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sub_vendor_agreements');
  },
};
