/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('four-o-four', {
      url: '/404',
      template: '<four-o-four></four-o-four>',
      data: { pageTitle: '404 Not found' },
    });
}
