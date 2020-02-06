const { CLIENT_META } = require('../../../config/buckets');

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'client_meta',
      'key',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(CLIENT_META)],
      },
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'client_meta',
      'key',
      {
        type: Sequelize.ENUM,
        values: [...Object.values(CLIENT_META)],
      },
    );
  },
};
