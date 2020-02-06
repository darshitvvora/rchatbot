const { SUB_CASE_STATES } = require('../../../config/buckets');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'sub_case_states',
      'state',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(SUB_CASE_STATES)],
      },
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'sub_case_states',
      'state',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(SUB_CASE_STATES)],
      },
    );
  },
};
