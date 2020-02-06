module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cases',
      'custom_fields',
      {
        type: Sequelize.JSON,
        defaultValue: null,
        after: 'config',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'cases',
      'custom_fields',
    );
  },
};
