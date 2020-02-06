
const ses = require('../../conn/email/ses');
const {
  SES_DIRECT, CURRENT_EMAIL, root, EMAIL_SOURCE, EMAIL_TO,
} = require('../../config/environment');

const required = require;
const emailBaseDir = `${root}/server/emails`;

exports.cmd = (e) => {
  const templateFullName = e || CURRENT_EMAIL || 'Action-Ad_m-qd-jd-priority';
  const [layout, template] = templateFullName.split('_');

  const {
    Template, TemplateData, attachments, Subject,
  } = required(`${emailBaseDir}/${layout}/${template}/${template}`);


  return ses.quarc
    .updateTemplateAsync({ Template })
    .then(() => {
      const email = {
        Source: EMAIL_SOURCE || 'notifications@quezx.com',
        Destination: {
          ToAddresses: [EMAIL_TO || 'noble-at-quezx.com@quezx.in'],
        },
        Template: templateFullName,
        TemplateData: JSON.stringify(TemplateData),
      };

      if (attachments) {
        email.attachments = attachments;
        email.Subject = Subject;
      }

      return (SES_DIRECT === 'true'
        ? ses.quarc
        : ses)
        .sendTemplatedEmailAsync(email);
    });
};
