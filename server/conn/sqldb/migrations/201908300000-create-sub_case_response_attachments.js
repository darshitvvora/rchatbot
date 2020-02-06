const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sub_case_response_attachments', Object.assign(
      properties('subCaseResponseAttachment', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        sub_case_response_id: keys('sub_case_responses'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sub_case_response_attachments');
  },
};
