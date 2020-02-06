const properties = require('./client.property');
const { CLIENT_META } = require('../../config/buckets');

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', Object
    .assign(properties(DataTypes)), {
      tableName: 'clients',
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_on',
      updatedAt: false,
      deletedAt: 'deleted_on',
    });

  Client.associate = (db) => {
    Client.hasMany(db.User);
    Client.hasMany(db.Case);

    Client.hasMany(db.User.scope('admins'), {
      as: 'Admins',
      foreignKey: 'client_id',
    });
  };

  Client.getAdminsForEmail = async (db, { clientId }) => {
    const adminsForEmail = await db.ClientMeta.findOne({
      attributes: ['value'],
      where: {
        key: CLIENT_META.ENABLE_ADMINS_IN_MAILS,
        client_id: clientId,
      },
      include: {
        model: db.Client,
        attributes: ['id'],
        include: [{
          model: db.User,
          as: 'Admins',
          attributes: ['email'],
        }],
      },
    });

    if (
      adminsForEmail && adminsForEmail.value === 'true'
      && adminsForEmail.Client.Admins
    ) {
      return adminsForEmail.Client.Admins.map(adm => adm.email);
    }

    return [];
  };

  return Client;
};
