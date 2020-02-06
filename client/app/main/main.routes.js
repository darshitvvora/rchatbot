/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/main',
      abstract: true,
      template: '<main></main>',
      resolve: {
        appAccess: (Session, $q) => {
          const defer = $q.defer();
          if (Session.isLoggedIn) {
            return defer.resolve();
          }

          return defer.reject();
        },
      },
    });
}
