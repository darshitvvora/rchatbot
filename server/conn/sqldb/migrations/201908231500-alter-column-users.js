const { USER } = require('../../../config/buckets');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'users',
      'type',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(USER)],
      },
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'users',
      'type',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(USER)],
      },
    );
  },
};
