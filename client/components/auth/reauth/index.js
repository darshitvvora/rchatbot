import angular from 'angular';
import ReauthComponent from './reauth.component';
import ReauthService from './reauth.service';

export default angular
  .module('extensionApp.reauth', [])
  .service('Reauth', ReauthService)
  .component('reauth', ReauthComponent)
  .name;
