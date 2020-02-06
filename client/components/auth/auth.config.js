/* @ngInject */
function authConfig($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}

export default authConfig;
