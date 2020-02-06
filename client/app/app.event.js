/* @ngInject */
function events($rootScope, Auth, AUTH_EVENTS) {

  // eslint-disable-next-line angular/on-watch
  $rootScope.$on(AUTH_EVENTS.loginRequired, () => Auth.refreshToken());
}

export default events;
