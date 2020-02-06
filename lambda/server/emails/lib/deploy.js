const fs = require('fs');

const build = require('./build');
const serve = require('./serve');
const { root } = require('../../config/environment');

exports.cmd = () => Promise
  .all([
    'trans-new', 'trans-wide',
  ].map(layout => Promise
    .all(fs.readdirSync(`${root}/server/emails/${layout}`)
      .map((template) => {
        if (template.includes('.')) return Promise.resolve();

        return build.cmd(`${layout}_${template}`)
          .then(() => serve.cmd(`${layout}_${template}`))
          .catch(() => serve.cmd(`${layout}_${template}`));
      }))));
