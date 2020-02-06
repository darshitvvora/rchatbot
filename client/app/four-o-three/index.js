import angular from 'angular';
import uiRouter from 'angular-ui-router';
import FourOThreeComponent from './four-o-three.component';
import routing from './four-o-three.routes';

export default angular
  .module('extensionApp.four-o-three', [uiRouter])
  .config(routing)
  .component('fourOThree', FourOThreeComponent)
  .name;
