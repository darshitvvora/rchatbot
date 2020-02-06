module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.changeColumn(
        'case_checks',
        'comment',
        {
          type: Sequelize.TEXT,
        },
      ),
      await queryInterface.changeColumn(
        'case_state_reasons',
        'comment',
        {
          type: Sequelize.TEXT,
        },
      ),
    ];
  },
  async down(queryInterface, Sequelize) {
    return [
      await queryInterface.changeColumn(
        'case_checks',
        'comment',
        {
          type: Sequelize.STRING,
        },
      ),
      await queryInterface.changeColumn(
        'case_state_reasons',
        'comment',
        {
          type: Sequelize.STRING,
        },
      ),
    ];
  },
};
