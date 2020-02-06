module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'clients',
      'is_registered',
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        after: 'type',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'clients',
      'is_registered',
    );
  },
};
