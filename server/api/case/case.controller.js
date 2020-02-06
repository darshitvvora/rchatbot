exports.getCaseBuckets = async (req, res, next) => {
  try {
    return res.json([]);
  } catch (err) {
    return next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    return res.json([]);
  } catch (err) {
    return next(err);
  }
};
