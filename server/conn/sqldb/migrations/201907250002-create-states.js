const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('states', Object.assign(
      properties('state', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('states');
  },
};
