module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    company_name: DataTypes.STRING,
    company_registered_name: DataTypes.STRING,
    source_app_id: DataTypes.INTEGER,
  }, {
    tableName: 'clients',
    timestamps: true,
    underscored: true,
    updatedAt: false,
  });

  return Client;
};

