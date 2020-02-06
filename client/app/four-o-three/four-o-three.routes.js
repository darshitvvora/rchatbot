/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('four-o-three', {
      url: '/403',
      template: '<four-o-three></four-o-three>',
      data: { pageTitle: '403 Unauthorised' },
    });
}
