const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    subCase: {
      Case: {
        full_name: 'Yatish',
      },
      SubCaseTemplate: {
        name: 'Address check template name',
      },
      Creator: {
        name: 'sub case creator (vendor)',
        Client: {
          name: 'vendor client name',
          Admins: [{
            email: 'xsxs@asas.com',
          }, {
            email: 'yyyyy@asas.com',
          }],
        },
      },
      SubVendor: {
        name: 'sub vendor latest admin user',
        email: 'subvendor@g.com',
        Client: {
          name: 'subvendor client name',
          Admins: [{
            email: 'ad11@asas.com',
          }, {
            email: 'ad2@asas.com',
          }],
        },
      },
    },
    comment: 'What is the update',
    subject: 'Update on Case - Yatish Motamarri',
  },
  Meta: { description: 'Vendor Commented' },
  Template: {
    SubjectPart: '{{subject}}',
    TemplateName,
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
