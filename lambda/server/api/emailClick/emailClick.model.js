module.exports = function EmailClickModel(sequelize, DataTypes) {
  const EmailClick = sequelize.define('EmailClick', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    message_id: DataTypes.STRING,
    click_timestamp: DataTypes.DATE,
  }, {
    tableName: 'email_clicks',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  return EmailClick;
};
