/* @ngInject */
function AuthInterceptor($window, Session, urls) {
  return {
    request(config) {
      const conf = config;

      // handle url request without domain to api server
      if (conf.url[0] === '/') conf.url = `${urls.API_SERVER}/api${conf.url}`;

      if (!!conf.ignoreAuthModule) return conf; // don't need token
      // little bit hacky for now => if index is zero only then returns truthy
      if (!conf.url.indexOf(urls.API_SERVER) && !Session.isLoggedIn) {
        const location = $window.location;
        const { pathname, search } = location;

        // redirect to accounts for authentication if not loggedIn
        location.href = `${urls.LOGIN}&state=${pathname}${search}`;
        return null;
      }

      // Attach accessToken to api requests
      conf.headers.Authorization = `Bearer ${Session.accessToken}`;
      return conf;
    },
  };
}

export default AuthInterceptor;
