const properties = require('./user.property');
const { USER } = require('../../config/buckets');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', Object
    .assign(properties(DataTypes)), {
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
      deletedAt: 'deleted_on',
      scopes: {
        admins: {
          where: {
            type: USER.ADMIN,
          },
        },
      },
    });

  User.associate = (db) => {
    User.belongsTo(db.Client, {
      foreignKey: 'client_id',
    });

    User.hasMany(db.Case, {
      as: 'CaseCreator',
      foreignKey: 'created_by',
    });
  };

  return User;
};
