import angular from 'angular';
import uiRouter from 'angular-ui-router';
import OauthComponent from './oauth.component';
import routing from './oauth.routes';

export default angular
  .module('extensionApp.oauth', [uiRouter])
  .config(routing)
  .component('oauth', OauthComponent)
  .name;
