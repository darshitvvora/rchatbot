const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    subCase: {
      Case: {
        full_name: 'Yatish',
        Creator: {
          Client: {
            name: 'case creator',
          },
        },
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
        },
      },
    },
    link: 'http://verify.quezx.test',
    subject: 'Yatish Motamarri - Database Check - Report Submitted',
  },
  Meta: { description: 'Sub Vendor report submitted' },
  Template: {
    SubjectPart: '{{subject}}',
    TemplateName,
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
