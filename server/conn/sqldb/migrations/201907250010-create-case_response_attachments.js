const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('case_response_attachments', Object.assign(
      properties('caseResponseAttachment', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        case_response_id: keys('case_responses'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('case_response_attachments');
  },
};
