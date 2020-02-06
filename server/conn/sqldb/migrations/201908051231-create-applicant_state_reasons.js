const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('case_state_reasons', Object.assign(
      properties('caseStateReason', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        case_state_id: keys('case_states'),
        reason_id: keys('reasons'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('case_state_reasons');
  },
};
