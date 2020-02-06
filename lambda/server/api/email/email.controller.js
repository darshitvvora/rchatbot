const ses = require('../../conn/email/ses');
const logger = require('../../components/logger');

async function sendMail(req, res) {
  try {
    await ses.sendTemplatedEmail(req.body.emailData);

    return res.sendStatus(201);
  } catch (err) {
    return logger.error(err);
  }
}

module.exports = {
  sendMail,
};
