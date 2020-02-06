module.exports = (sequelize, DataTypes) => {
  const EmailTemplateAd = sequelize.define('EmailTemplateAd', {
    id: {
      type: DataTypes.INTEGER(14),
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'email_template_ads',
    timestamps: true,
    underscored: true,
    paranoid: true,
  });

  EmailTemplateAd.associate = (db) => {
    EmailTemplateAd.belongsTo(db.Ad);
    EmailTemplateAd.belongsTo(db.EmailTemplate);
  };

  return EmailTemplateAd;
};
