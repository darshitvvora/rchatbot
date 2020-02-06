const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('case_share_attachments', Object.assign(
      properties('caseShareAttachment', DataTypes),
      timestamps(['c'], DataTypes),
      {
        created_by: keys('users'),
        case_share_id: keys('case_share'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('case_share_attachments');
  },
};
