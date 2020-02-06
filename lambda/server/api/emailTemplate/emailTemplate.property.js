module.exports = DataTypes => ({
  name: {
    type: DataTypes.STRING(100),
    unique: true,
  },
  description: DataTypes.STRING,
  type: DataTypes.STRING,
  subject: DataTypes.STRING,
  body: DataTypes.TEXT,
  to: DataTypes.STRING,
  cc: DataTypes.STRING,
  bcc: DataTypes.STRING,
  comments: DataTypes.STRING,
});
