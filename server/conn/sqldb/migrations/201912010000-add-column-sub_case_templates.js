module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'sub_case_templates',
      'abbrevation',
      {
        type: Sequelize.STRING,
        after: 'name',
      },
    );
  },
  down(queryInterface) {
    return queryInterface.removeColumn(
      'sub_case_templates',
      'abbrevation',
    );
  },
};
