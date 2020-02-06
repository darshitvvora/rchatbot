const {
  Client, VendorPartner, ClientMeta,
} = require('../../conn/sqldb');

exports.getVendorPartners = async (req, res, next) => {
  try {
    const data = await Client.findAll({
      attributes: ['id', 'name'],
      include: [{
        model: VendorPartner,
        attributes: [],
        where: { vendor_id: req.user.client_id },
        required: true,
      }],
    });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};

exports.getMetaInfo = async (req, res, next) => {
  try {
    const { keyStr } = req.query;
    const { client_id: clientId } = req.user;

    if (!keyStr) return res.status(400).json({ message: 'Key not found' });

    const data = await ClientMeta.findAll({
      attributes: ['key', 'value'],
      where: {
        client_id: clientId,
        key: keyStr.split(','),
      },
    }).then(rows => rows.reduce(
      (acc, { key, value }) => Object.assign(acc, { [key]: value })
      , {})
    );

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
