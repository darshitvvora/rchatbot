module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'sub_cases',
      'addon_commercial',
      {
        type: Sequelize.DECIMAL,
        after: 'comment',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'sub_cases',
      'addon_commercial',
    );
  },
};
