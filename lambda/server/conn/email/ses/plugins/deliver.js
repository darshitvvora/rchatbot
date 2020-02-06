const debug = require('debug');
const quarc = require('../connection');
const ses2rawEmail = require('../ses2rawEmail');

const log = debug('conn/email/ses/plugins/deliver');

module.exports = async ([params, emailLog]) => {
  log('deliver', params);
  if (params.attachments && !params.Subject) {
    return Promise.reject(new Error({ message: 'Email with attachment should have subject' }));
  }

  const {
    Destination: {
      ToAddresses = [],
      BccAddresses = [],
      CcAddresses = [],
    },
    ReplyToAddresses = [],
  } = params;

  Object.assign(params.Destination, {
    ToAddresses: [...new Set(ToAddresses.map(addr => addr.trim()))],
    BccAddresses: [...new Set(BccAddresses.map(addr => addr.trim()))],
    CcAddresses: [...new Set(CcAddresses.map(addr => addr.trim()))],
  });

  Object.assign(params, {
    ReplyToAddresses: ReplyToAddresses.map(addr => addr.trim()),
  });

  const promise = params.attachments
    ? ses2rawEmail(params, JSON.parse(params.TemplateData))
      .then((rawEmail) => {
        const bccAdd = params.Destination.BccAddresses || [];
        return quarc
          .sendRawEmailAsync({
            Destinations: bccAdd.length ? [bccAdd.join(',')] : [],
            RawMessage: {
              Data: rawEmail,
            },
          });
      })
    : quarc.sendTemplatedEmailAsync(params);

  return promise
    .then((status) => {
      const {
        ToAddresses: to = [],
        BccAddresses: bcc = [],
        CcAddresses: cc = [],
      } = params.Destination;

      return [params, {
        ...emailLog,
        message_id: status.MessageId,
        to: to.join(','),
        cc: cc.join(','),
        bcc: bcc.join(','),
      }];
    });
};
