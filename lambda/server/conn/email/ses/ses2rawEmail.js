const debug = require('debug');
const mailcomposer = require('mailcomposer');
const renderForSES = require('./render');
const ses2mail = require('../../../components/ses2mail');
const Minio = require('../../../components/minio');
const handlebars = require('handlebars');

const log = debug('conn/email/ses/ses2rawEmail');

module.exports = async (params, TemplateData) => {
  log('ses2rawEmail', TemplateData);
  const awsSesTemplateHtml = renderForSES({ TemplateName: params.Template });

  const htmlEmail = handlebars.compile(awsSesTemplateHtml)(TemplateData);

  const attachments = await Promise
    .all(params.attachments
      .map((x) => {
        if (!x.minio) return x;
        return Minio
          .getFileStream({ object: x.path })
          .then(stream => ({
            filename: x.filename,
            content: stream,
          }));
      }));


  const mail = mailcomposer({
    ...ses2mail({ ...params, Body: { Html: { Data: htmlEmail } }, Subject: params.Subject }),
    attachments,
  });

  return new Promise((resolve, reject) => {
    mail.build((err, rawEmail) => {
      if (err) return reject(err);
      return resolve(rawEmail);
    });
  });
};
