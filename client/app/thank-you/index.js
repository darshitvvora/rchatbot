import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ThankYouComponent from './thank-you.component';
import routing from './thank-you.routes';

export default angular
  .module('extensionApp.thank-you', [uiRouter])
  .config(routing)
  .component('thankYou', ThankYouComponent)
  .name;
