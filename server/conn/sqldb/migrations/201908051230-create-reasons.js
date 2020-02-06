const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('reasons', Object.assign(
      properties('reason', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        state_id: keys('states'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('reasons');
  },
};
