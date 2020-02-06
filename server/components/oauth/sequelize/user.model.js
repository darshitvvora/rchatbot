module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: DataTypes.STRING,
    app_id: DataTypes.INTEGER,
    is_demo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mobile: DataTypes.STRING,
    title: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
    paranoid: true,
  });

  return User;
};
