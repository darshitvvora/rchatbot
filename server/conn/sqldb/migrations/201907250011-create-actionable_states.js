const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('actionable_states', Object.assign(
      properties('actionableState', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        state_id: keys('states'),
        child_state_id: keys('states'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('actionable_states');
  },
};
