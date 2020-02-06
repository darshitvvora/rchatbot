const { AccessToken, User } = require('../../conn/sqldb/auth');

const oAuthModel = {
  getAccessToken(bearerToken, callback) {
    return AccessToken
      .findOne({
        where: { access_token: bearerToken },
        attributes: [
          'access_token', 'expires', 'session_id',
          'app_id', 'user_id',
        ],
        include: [{
          model: User,
          attributes: [
            'id', 'email', 'first_name',
            'last_name', 'mobile',
          ],
        }],
      })
      .then((t) => {
        const token = t;

        if (!token) return callback(null, false);

        token.user = token.User.toJSON();
        token.user.client = token.User.Client;

        delete token.User;
        delete token.user.Client;

        callback(null, token);
        return token;
      })
      .catch(callback);
  },
};

module.exports = oAuthModel;
