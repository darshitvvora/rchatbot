/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('oauth', {
      url: '/access/oauth',
      template: '<oauth></oauth>',
      data: { pageTitle: 'Authentication in progress' },
    });
}
