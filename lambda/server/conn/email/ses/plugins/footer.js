const debug = require('debug');
const db = require('../../../sqldb/index');

const log = debug('q-conn-ses-plugins-ad');

module.exports = ([params, emailLog]) => db.Ad
  .find({
    attributes: ['id', 'name', 'html'],
    where: {
      name: 'footer',
    },
    raw: true,
  })
  .then((footer) => {
    log('footer', footer);
    if (!footer) return Promise.resolve([params, emailLog]);

    const TemplateData = JSON.parse(params.TemplateData);

    TemplateData.footer = footer.html;

    const updatedParams = { ...params, TemplateData: JSON.stringify(TemplateData) };

    return [updatedParams, { ...emailLog }];
  });

