
const {
  engine, timestamps, properties, id,
} = require('../helper.js');

module.exports = {
  up: (queryInterface, DataTypes) => queryInterface
    .createTable('email_templates', {
      id,
      ...properties('emailTemplate', DataTypes),
      ...timestamps(3, DataTypes),
    }, engine),
  down(queryInterface) {
    return queryInterface.dropTable('email_templates');
  },
};

