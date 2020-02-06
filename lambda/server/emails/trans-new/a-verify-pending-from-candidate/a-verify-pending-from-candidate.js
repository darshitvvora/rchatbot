const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    publicCifLink: 'http://verify.quezx.test',
    caseData: {
      full_name: 'candidate name',
      Creator: {
        email: 'creator@example.com',
        mobile: 9769971855,
        Client: {
          name: 'ClientName',
        },
      },
    },
  },
  Meta: {
    description: 'Candidate verification pending reminder',
  },
  Template: {
    TemplateName,
    SubjectPart: '{{caseData.full_name}} - Action Pending - Complete the Candidate Information Form',
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
