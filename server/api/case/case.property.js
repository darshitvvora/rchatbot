module.exports = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: DataTypes.STRING,
  email: DataTypes.STRING,
  client_category_id: DataTypes.INTEGER,
  vendor_id: DataTypes.INTEGER,
  vendor_user_id: DataTypes.INTEGER,
  config: DataTypes.JSON,
  custom_fields: DataTypes.JSON,
  case_state_id: DataTypes.INTEGER,
  tat: {
    type: DataTypes.INTEGER,
    comment: 'TAT (in days)',
    defaultValue: null,
  },
  created_by: DataTypes.INTEGER,
  updated_by: DataTypes.INTEGER,
  deleted_by: DataTypes.INTEGER,
});
