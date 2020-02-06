const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  TemplateData: {
    clientName: 'Demo',
    candidateName: 'Candidate Name',
    categoryName: 'Demo Category',
    checkList: ['identity', 'Education Check', 'Employment Check'],
    link: 'http://verify.quezx.test/main/cases/217/view',
  },
  Meta: {
    description: 'Case Allocation To Vendor',
  },
  Template: {
    TemplateName,
    SubjectPart: 'Verification required for {{candidateName}}',
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
