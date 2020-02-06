const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sub_case_comments', Object.assign(
      properties('subCaseComment', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        sub_case_id: keys('sub_cases'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sub_case_comments');
  },
};
