import angular from 'angular';
import SessionService from './session.service';

export default angular
  .module('extensionApp.session', [])
  .service('Session', SessionService)
  .name;
