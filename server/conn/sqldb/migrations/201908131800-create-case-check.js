const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('case_checks', Object.assign(
      properties('caseCheck', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        case_id: keys('cases'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('case_checks');
  },
};
