module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'case_states',
      'tat_action_by',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        after: 'tat_action_on',
      },
    );
  },
  async down(queryInterface) {
    return queryInterface.removeColumn(
      'case_states',
      'tat_action_by',
    );
  },
};
