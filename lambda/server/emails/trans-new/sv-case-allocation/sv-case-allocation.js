const getTemplate = require('../../../conn/email/ses/render');

const TemplateName = __dirname.split('/').slice(-2).join('_');
const afterContent = [];

module.exports = {
  attachments: [{
    minio: true,
    filename: '1.pdf',
    path: '1.pdf',
  }],
  Subject: 'Candidate Name - New Case Allocated',
  TemplateData: {
    templateName: 'template name',
    vendorName: 'Sub vendor name',
    vendorAdmin: {
      Client: {
        name: 'Vendor Client Name',
      },
    },
    publicSubCaseLink: 'http://verify.quezx.test',
    to: [],
    html: '<table><tr><td>Full Name (As per PAN/ Aadhaar Card)</td><td>Sub Case data</td></tr></table>',
    comment: `asa1
    sa
    sa
    sa
    sa`.replace(/(\r\n|\n|\r)/gm, '<br>'),
  },
  Meta: { description: 'Sub Vendor allocation' },
  Template: {
    SubjectPart: '{{vendorName}} - {{templateName}} - New Case Allocated',
    TemplateName,
    HtmlPart: getTemplate({
      TemplateName,
      afterContent,
    }),
  },
};
