const {
  engine, timestamps, properties,
} = require('../helper.js');

module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.createTable('bd_queries', Object.assign(
      properties('bdQuery', DataTypes),
      timestamps(['c', 'd'], DataTypes),
      {},
    ), engine);
  },
  down(queryInterface) {
    return queryInterface.dropTable('bd_queries');
  },
};
