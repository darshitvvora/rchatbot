const { USER } = require('../../config/buckets');

module.exports = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  client_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  mobile: DataTypes.STRING,
  type: {
    type: DataTypes.ENUM,
    values: [...Object.values(USER)],
  },
  is_admin: DataTypes.BOOLEAN,
  updated_by: DataTypes.INTEGER,
  created_by: DataTypes.INTEGER,
  deleted_by: DataTypes.INTEGER,
});
