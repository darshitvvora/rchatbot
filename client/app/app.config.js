/* @ngInject */
export function routeConfig($urlRouterProvider, $locationProvider) {
  $urlRouterProvider.when('/', '/main/dashboard');
  $urlRouterProvider.otherwise('/404');

  $locationProvider.html5Mode(true);
}
