const { CLIENT } = require('../../config/buckets');

module.exports = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: DataTypes.STRING,
  logo_path: DataTypes.STRING,
  type: {
    type: DataTypes.ENUM,
    values: [...Object.values(CLIENT)],
  },
  is_registered: DataTypes.BOOLEAN,
  created_by: DataTypes.INTEGER,
  deleted_by: DataTypes.INTEGER,
});
