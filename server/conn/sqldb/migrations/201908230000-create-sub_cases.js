const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('sub_cases', Object.assign(
      properties('subCase', DataTypes),
      timestamps(['c', 'd', 'u'], DataTypes),
      {
        case_id: keys('cases'),
        user_id: keys('users'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('sub_cases');
  },
};
