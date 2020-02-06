/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('subscription', {
      url: '/subscription',
      template: '<subscription></subscription>',
      data: { pageTitle: 'Not Subscribed' },
    });
}
