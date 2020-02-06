const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sub_case_states', Object.assign(
      properties('subCaseState', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        sub_case_id: keys('sub_cases'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sub_case_states');
  },
};
