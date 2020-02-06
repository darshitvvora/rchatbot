const debug = require('debug');
const addressparser = require('addressparser');

const db = require('../../../sqldb/index');

const log = debug('q-server-conn-ses-preference');

const map = {
  ToAddresses: 'to',
  CcAddresses: 'cc',
  BccAddresses: 'bcc',
};

module.exports = async ([params, emailLog]) => {
  const emailTemplate = await db.EmailTemplate
    .find({
      attributes: ['id'],
      where: { name: params.Template },
      raw: true,
    });

  if (!emailTemplate) return [params, emailLog];

  const emails = [];
  let Destination = { ...params.Destination };

  Object.keys(Destination).forEach((x) => {
    Destination = {
      ...Destination,
      [x]: Destination[x]
        .map((rawEmail) => {
          const [parsed] = addressparser(rawEmail);
          emails.push(parsed.address);
          return parsed;
        }),
    };
  });

  const users = await db.User.findAll({
    attributes: ['id', 'email'],
    where: {
      email: emails,
    },
    raw: true,
  });

  const userIdUserMap = {};

  const blocked = await db.EmailPreference
    .findAll({
      attributes: ['user_id'],
      where: {
        enabled: false,
        email_template_id: emailTemplate.id,
        user_id: users.map((x) => {
          userIdUserMap[x.id] = x;
          return x.id;
        }),
      },
      raw: true,
    });

  log('preference', { blocked, params });
  if (!blocked.length) {
    return Promise.resolve([
      params,
      {
        ...emailLog,
        email_template_id: emailTemplate.id,
      }]);
  }


  const emailIdBlockedMap = blocked
    .reduce((nxt, x) => ({ ...nxt, [userIdUserMap[x.user_id].email]: x }), {});

  const eL = emailLog;
  Object
    .keys(params.Destination)
    .forEach((x) => {
      eL[map[x]] = JSON.stringify(params.Destination[x].join(','));

      return Object
        .assign(params.Destination, {
          [x]: Destination[x]
            .filter((emailObject) => {
              const allowed = !emailIdBlockedMap[emailObject.address];
              if (!allowed) {
                const userId = emailIdBlockedMap[emailObject.address].user_id;

                eL.terminated_ids = eL.terminated_ids
                  ? `${eL.terminated_ids},${userId}`
                  : userId;
                eL.email_template_id = emailTemplate.id;
              }
              return allowed;
            }).map(emailObject => emailObject.address),
        });
    });

  const {
    ToAddresses: toAddres = [],
    CcAddresses: ccAddres = [],
    BccAddresses: bccAddres = [],
  } = params.Destination;

  if (![...toAddres, ...ccAddres, ...bccAddres].length || ![...toAddres].length) {
    return Promise.reject(new Error({
      data: [params, eL],
      code: 400,
      message: 'terminated due to email preference',
    }));
  }

  return Promise.resolve([params, eL]);
};
