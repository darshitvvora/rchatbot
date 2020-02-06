const moment = require('moment');

module.exports = function AccessTokenModel(sequelize, DataTypes) {
  const AccessToken = sequelize.define('AccessToken', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    access_token: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10, 256],
          msg: 'Maximum length for value field is 255',
        },
      },
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: function setExpires() {
        return moment().add(1, 'hours');
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    scope: DataTypes.STRING,
    user_type: DataTypes.STRING,
    session_id: DataTypes.INTEGER,
    app_id: DataTypes.INTEGER,
  }, {
    tableName: 'access_tokens',
    timestamps: false,
    created_at: true,
    underscored: true,
    defaultScope: {
      where: { status: 1 },
    },
  });

  AccessToken.associate = function associate(db) {
    AccessToken.belongsTo(db.User, {
      foreignKey: 'user_id',
    });
  };

  return AccessToken;
};