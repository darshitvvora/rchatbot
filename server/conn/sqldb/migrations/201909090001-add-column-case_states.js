const { TAT_ACTIONS } = require('../../../config/buckets');

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.addColumn(
        'case_states',
        'tat_action',
        {
          type: Sequelize.ENUM,
          values: [...Object.values(TAT_ACTIONS)],
          defaultValue: null,
          after: 'path',
        },
      ),
      await queryInterface.addColumn(
        'case_states',
        'tat_action_on',
        {
          type: Sequelize.DATE,
          defaultValue: null,
          after: 'tat_action',
        },
      ),
    ];
  },
  async down(queryInterface) {
    return [
      await queryInterface.removeColumn(
        'case_states',
        'tat_action',
      ),
      await queryInterface.removeColumn(
        'case_states',
        'tat_action_on',
      ),
    ];
  },
};
