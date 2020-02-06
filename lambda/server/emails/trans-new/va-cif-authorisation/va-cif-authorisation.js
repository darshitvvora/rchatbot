const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    link: 'http://verify.quezx.test',
    caseData: {
      Creator: {
        email: 'xx@example.com',
        mobile: '789456321',
        Client: {
          name: 'ClientName',
        },
      },
    },
    candidateName: 'demo User',
  },
  Subject: 'Demo User, Action Required on Authorization on Candidate Information Form',
  attachments: [{
    minio: true,
    filename: '1.pdf',
    path: '1.pdf',
  }],
  Meta: { description: 'Unsigned Candidate Information Form' },
  Template: {
    SubjectPart: '{{candidateName}},' +
    'Action Required on Authorization on Candidate Information Form',
    TemplateName,
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
