import angular from 'angular';
import uiRouter from 'angular-ui-router';
import MainComponent from './main.component';
import routing from './main.routes';

export default angular
  .module('extensionApp.main', [uiRouter])
  .config(routing)
  .component('main', MainComponent)
  .name;
