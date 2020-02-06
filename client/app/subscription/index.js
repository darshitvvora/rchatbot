import angular from 'angular';
import uiRouter from 'angular-ui-router';
import SubscriptionComponent from './subscription.component';
import routing from './subscription.routes';

export default angular
  .module('extensionApp.subscription', [uiRouter])
  .config(routing)
  .component('subscription', SubscriptionComponent)
  .name;
