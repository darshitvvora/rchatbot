const { CHECK_TYPES } = require('../../../config/buckets');

module.exports = {
  async up(queryInterface, Sequelize) {
    return [
      await queryInterface.addColumn(
        'sub_case_templates',
        'check_type',
        {
          type: Sequelize.ENUM,
          values: [...Object.values(CHECK_TYPES)],
          defaultValue: null,
          after: 'config',
        },
      ),
      await queryInterface.addColumn(
        'sub_case_templates',
        'order',
        {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          after: 'check_type',
        },
      ),
    ];
  },
  async down(queryInterface) {
    return [
      await queryInterface.removeColumn(
        'sub_case_templates',
        'check_type',
      ),
      await queryInterface.removeColumn(
        'sub_case_templates',
        'order',
      ),
    ];
  },
};
