module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cases',
      'tat',
      {
        type: Sequelize.INTEGER,
        comment: 'TAT (in days)',
        defaultValue: null,
        after: 'case_share_id',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'cases',
      'tat',
    );
  },
};
