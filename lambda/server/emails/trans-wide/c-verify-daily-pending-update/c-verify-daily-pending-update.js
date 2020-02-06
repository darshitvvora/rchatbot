const moment = require('moment');
const { PREFIX, DOMAIN } = require('./../../../config/environment');

const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');

module.exports = {
  TemplateData: {
    todayDate: moment().format('DD-MMM-YYYY'),
    userName: 'Demo User Template',
    userList: [{
      name: 'Case Created',
      applicants: [{
        name: 'Ruben Pereira',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/202/view`,
      }, {
        name: 'Sahil Kolte',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/203/view`,
      }],
    }, {
      name: 'Case Allocated',
      applicants: [{
        name: 'Tinoy Tony',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/200/view`,
      }, {
        name: 'Mohit Shah',
        link: `${PREFIX}verify.${DOMAIN}/main/cases/210/view`,
      }],
    }],
  },
  Meta: {
    group_id: 2,
    description: 'Update on your daily Cases - Client',
  },
  Template: {
    TemplateName,
    SubjectPart: 'Action Required on your Cases - {{todayDate}}',
    HtmlPart: getTemplate({
      TemplateName,
    }),
  },
};
