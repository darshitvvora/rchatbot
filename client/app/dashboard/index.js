import angular from 'angular';
import uiRouter from 'angular-ui-router';
import DashboardComponent from './dashboard.component';
import routing from './dashboard.routes';

export default angular
  .module('extensionApp.dashboard', [uiRouter])
  .config(routing)
  .component('dashboard', DashboardComponent)
  .name;
