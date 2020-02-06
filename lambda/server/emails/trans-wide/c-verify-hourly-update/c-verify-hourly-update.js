const moment = require('moment');
const { PREFIX, DOMAIN } = require('./../../../config/environment');

const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = ['layout:dashboardButton'];

module.exports = {
  TemplateData: {
    todayDate: moment().format('DD-MMM-YYYY'),
    dashboardLink: `${PREFIX}partner.${DOMAIN}/dashboard?utm_source=Email&utm_campaign=p-hourly-update`,
    userName: 'Demo User Template',
    userList: [{
      name: 'Keertana',
      applicants: [{
        name: 'Ruben Pereira',
        state: 'Awaiting Feedback on CV',
        comment: '<p>Good Profile.</p>',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/202/view`,
      }, {
        name: 'Sahil Kolte',
        state: 'CV Reject',
        comment: 'Good Profile.',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/203/view`,
      }],
    }, {
      name: 'Suzie',
      applicants: [{
        name: 'Tinoy Tony',
        state: 'Awaiting Feedback on CV',
        comment: 'Good Profile.',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/200/view`,
      }, {
        name: 'Mohit Shah',
        state: 'CV Reject',
        comment: 'Interview Completed.',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/210/view`,
      }],
    }],
  },
  Meta: {
    group_id: 2,
    description: 'Update on your Cases - Consultants',
  },
  Template: {
    TemplateName,
    SubjectPart: 'Update on your Cases - {{todayDate}}',
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
