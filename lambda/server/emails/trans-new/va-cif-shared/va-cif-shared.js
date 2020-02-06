const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    candidateName: 'Candidate Name',
    publicCifLink: 'http://verify.quezx.test',
    emailBody: `<div>Hi Yatish,</div>
    <div>QVPL has shared a Candidate Information Form with you.</div>`,
    emailSubject: 'Yatish, action Required on your Candidate Information Form',
    caseData: {
      Creator: {
        email: 'xx@example.com',
        mobile: '789456321',
        Client: {
          name: 'ClientName',
        },
      },
    },
  },
  Meta: { description: 'Candidate Candidate Information Form' },
  Template: {
    SubjectPart: '{{emailSubject}}',
    TemplateName,
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
