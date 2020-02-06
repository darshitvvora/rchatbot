const { CASE_CHECK_STATUS } = require('../../../config/buckets');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'case_checks',
      'status',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(CASE_CHECK_STATUS)],
      },
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'case_checks',
      'status',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(CASE_CHECK_STATUS)],
      },
    );
  },
};
