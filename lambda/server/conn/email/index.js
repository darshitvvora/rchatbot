import _ from 'lodash';
import nodemailer from 'nodemailer';
import { htmlToText } from 'nodemailer-html-to-text';

import config from '../../config/environment/index';

if (config.smtp.host === 'localhost') delete config.smtp.auth;

const transport = nodemailer.createTransport(config.smtp);
transport.use('compile', htmlToText());

transport.send = (options) => {
  const mail = {
    from: 'QuezX <notifications@quezx.com>',
    sender: `QuezX <${config.SMTP_USER}>`,
    ...options,
  };

  const { html } = mail;
  if (_.isArray(html)) mail.html = html.join(' ');
  return transport.sendMail(mail);
};

export default transport;
