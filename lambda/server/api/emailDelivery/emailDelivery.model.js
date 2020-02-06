module.exports = function EmailDeliveryModel(sequelize, DataTypes) {
  const EmailDelivery = sequelize.define('EmailDelivery', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    message_id: DataTypes.STRING,
    email: DataTypes.STRING,
    message: DataTypes.STRING,
  }, {
    tableName: 'email_deliveries',
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_on',
  });

  return EmailDelivery;
};
