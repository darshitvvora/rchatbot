/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('main.dashboard', {
      url: '/dashboard',
      template: '<dashboard></dashboard>',
      data: { pageTitle: 'Dashboard | QuezX Extension' },
    });
}
