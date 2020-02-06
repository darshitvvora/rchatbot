const {
  engine, timestamps, properties, keys,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('case_comments', Object.assign(
      properties('caseComment', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {
        created_by: keys('users'),
        deleted_by: keys('users'),
        case_id: keys('cases'),
      },
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('case_comments');
  },
};
