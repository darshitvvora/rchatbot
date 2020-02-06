const _ = require('lodash');

module.exports = (database) => {
  const db = database;
  ['AccessToken', 'User'].forEach((model) => {
    db[model] = db.sequelize.import(`./${_.camelCase(model)}.model.js`);
  });

  Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });
};
