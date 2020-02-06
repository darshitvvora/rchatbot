const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('cases', Object.assign(
      properties('case', DataTypes),
      timestamps(['c', 'd', 'u'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        vendor_id: keys('clients'),
        client_category_id: keys('client_categories'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('cases');
  },
};
