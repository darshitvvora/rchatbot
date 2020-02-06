/* eslint-disable new-cap */
module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.removeColumn(
        'cases',
        'middle_name'
      ),
      await queryInterface.renameColumn(
        'cases',
        'first_name',
        'full_name',
      ),
      await queryInterface.changeColumn(
        'cases',
        'full_name',
        {
          type: Sequelize.TEXT,
        },
      ),
      await queryInterface.changeColumn(
        'cases',
        'last_name',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ];
  },
  async down(queryInterface) {
    return [
      await queryInterface.addColumn(
        'cases',
        'middle_name',
      ),
      await queryInterface.renameColumn(
        'cases',
        'full_name',
        'first_name',
      ),
    ];
  },
};
