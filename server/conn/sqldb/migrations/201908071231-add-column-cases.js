module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'cases',
      'vendor_user_id',
      {
        type: Sequelize.INTEGER,
        defaultValue: null,
        after: 'vendor_id',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'cases',
      'vendor_user_id',
    );
  },
};
