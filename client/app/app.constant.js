import angular from 'angular';
import moment from 'moment';

// eslint-disable-next-line angular/window-service
const { host, protocol } = window.location;
const PREFIX = `${protocol}//${host.substr(0, host.indexOf('-') + 1)}`;
const DOMAIN = `${host.substr(host.indexOf('.') + 1)}`;

const ACCOUNTS_APP = `${PREFIX}accounts.${DOMAIN}`;
const EXTENSION_APP = `${PREFIX}extension.${DOMAIN}`;
const CDN_LINK = 'https://cdn.quezx.com';
const API_SERVER = EXTENSION_APP;

const constants = angular
  .module('extensionApp.constants', [])
  .constant('moment', moment)
  .constant('urls', {
    API_SERVER,
    ACCOUNTS_APP,
    EXTENSION_APP,
    CDN_LINK,
    LOGIN: `${ACCOUNTS_APP}/signin?client_id=extensionquezx`,
  });

export default constants.name;
