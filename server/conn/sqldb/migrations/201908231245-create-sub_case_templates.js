const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sub_case_templates', Object.assign(
      properties('subCaseTemplate', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {},
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sub_case_templates');
  },
};
