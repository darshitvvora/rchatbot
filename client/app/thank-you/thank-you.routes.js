/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('thank-you', {
      url: '/thankYou',
      params: { msg: null },
      template: '<thank-you></thank-you>',
      data: { pageTitle: 'Thank you' },
    });
}
