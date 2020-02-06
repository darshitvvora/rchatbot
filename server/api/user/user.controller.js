const {
  User,
} = require('../../conn/sqldb');

exports.me = async (req, res, next) => {
  try {
    if (!req.user || !req.user.email) return res.sendStatus(403);

    return res.json(req.user);
  } catch (err) {
    return next(err);
  }
};

exports.index = async (req, res, next) => {
  try {
    const { type } = req.query;

    const where = {
      client_id: req.user.client_id,
    };

    if (type) {
      Object.assign(where, { type });
    }

    const data = await User.findAll({
      attributes: ['id', 'name', 'email'],
      where,
    });

    return res.json(data);
  } catch (err) {
    return next(err);
  }
};
