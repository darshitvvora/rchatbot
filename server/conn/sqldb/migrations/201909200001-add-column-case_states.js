module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'sub_cases',
      'comment',
      {
        type: Sequelize.TEXT,
        defaultValue: null,
        after: 'sub_case_state_id',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'sub_cases',
      'comment',
    );
  },
};
