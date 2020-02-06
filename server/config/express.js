require('express-zip');
const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const responseTime = require('response-time');
const requestLogger = require('express-request-logging');

const config = require('./environment');
const db = require('../conn/sqldb');
const logger = require('../components/logger');

module.exports = (app) => {
  const env = app.get('env');

  if (env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  app.use(responseTime());
  if (config.API_LOGGING === 'true') {
    app.use(requestLogger(db.sequelizeGlacier, { appId: +config.ACCOUNTS_APP_ID }, logger.error));
  }

  app.use(cors());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '50mb' }));

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));

  if (env === 'development') {
    /* eslint global-require:0 */
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const makeWebpackConfig = require('../../webpack.make');
    const webpackConfig = makeWebpackConfig({ DEV: true });
    const compiler = webpack(webpackConfig);
    const browserSync = require('browser-sync').create();

    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${config.port}`,
      ws: false,
      middleware: [
        webpackDevMiddleware(compiler, {
          noInfo: false,
          stats: { colors: true, timings: true, chunks: false },
        }),
      ],
      ui: false,
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message'],
    });

    compiler.plugin('done', (stats) => {
      if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000,
        });
      }

      return browserSync.reload();
    });
  }

  if (env === 'development' || env === 'test') {
    app.use(errorHandler());
  }

  Object.assign(app, { express });
};
