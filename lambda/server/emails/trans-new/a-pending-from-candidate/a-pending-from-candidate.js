const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    candidateName: 'Candidate Name',
    stateComment: '<p>State comment</p>',
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
  },
  Subject: 'Action Required - Pending Details for Verification',
  attachments: [{
    minio: true,
    filename: '1.pdf',
    path: '1.pdf',
  }],
  Meta: {
    description: 'Candidate verification pending form',
  },
  Template: {
    TemplateName,
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
