const properties = require('./case.property');

module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', Object
    .assign(properties(DataTypes)), {
      tableName: 'cases',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: 'updated_on',
      deletedAt: 'deleted_on',
    });

  Case.associate = (db) => {
    Case.belongsTo(db.Client, {
      foreignKey: 'vendor_id',
    });

    Case.belongsTo(db.User, {
      as: 'Creator',
      foreignKey: 'created_by',
    });

    Case.belongsTo(db.User, {
      as: 'Destroyer',
      foreignKey: 'deleted_by',
    });
  };

  return Case;
};
