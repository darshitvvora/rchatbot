module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'case_states',
      'comment',
      {
        type: Sequelize.TEXT,
      },
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'case_states',
      'comment',
      {
        type: Sequelize.STRING,
      },
    );
  },
};
