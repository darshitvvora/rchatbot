const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('case_share', Object.assign(
      properties('caseShare', DataTypes),
      timestamps(['c'], DataTypes),
      {
        case_id: keys('cases'),
      },
    ), engine);
  },

  down(queryInterface) {
    return queryInterface.dropTable('case_share');
  },
};
