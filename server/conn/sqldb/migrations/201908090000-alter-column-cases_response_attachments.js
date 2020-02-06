const { RESPONSE_ATTACHMENT } = require('../../../config/buckets');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'case_response_attachments',
      'type',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(RESPONSE_ATTACHMENT)],
      },
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'case_response_attachments',
      'type',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(RESPONSE_ATTACHMENT)],
      },
    );
  },
};
