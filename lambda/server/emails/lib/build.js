const logger = require('../../components/logger');
const { root, CURRENT_EMAIL } = require('../../config/environment');
const { EmailTemplate } = require('../../conn/sqldb');
const ses = require('../../conn/email/ses');

const required = require;

exports.cmd = (e) => {
  const emailBaseDir = `${root}/server/emails`;
  const templateFullName = e || CURRENT_EMAIL || 'Action-Ad_m-qd-jd-priority';
  const [layout, template] = templateFullName.split('_');

  const { Meta, Template } = required(`${emailBaseDir}/${layout}/${template}/${template}`);

  // make entry if doesnt exists in qurac email_templates
  EmailTemplate
    .findOrCreate({
      where: { name: templateFullName },
      defaults: {
        group_id: Meta.group_id,
        description: Meta.description,
      },
    })
    .catch(err => logger.error('buildTemplate EmailTemplate error', err, templateFullName));

  return ses.quarc
    .createTemplateAsync({ Template });
};
