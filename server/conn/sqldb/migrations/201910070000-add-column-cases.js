module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cases',
      'email',
      {
        type: Sequelize.STRING,
        defaultValue: null,
        after: 'last_name',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'cases',
      'email',
    );
  },
};
