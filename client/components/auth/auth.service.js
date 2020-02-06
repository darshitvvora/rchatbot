class AuthService {
  /* @ngInject */
  constructor($q, $log, $http, urls, authService, Session, Reauth) {
    this.refreshingToken = false;
    this.$q = $q;
    this.$log = $log;
    this.$http = $http;
    this.authService = authService;
    this.Session = Session;
    this.Reauth = Reauth;
    this.ACCOUNTS_APP = urls.ACCOUNTS_APP;
    this.EXTENSION_APP = urls.EXTENSION_APP;
  }

  login(credential) {
    return this
      .$http
      .post(`${this.ACCOUNTS_APP}/oauth/token`, credential, {
        ignoreAuthModule: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest(obj) {
          const str = Object.keys(obj)
            .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
          return str.join('&');
        },
      })
      .then(res => this.Session.create('oauth', res.data))
      .catch(res => {
        this.Session.destroy();
        return this.$q.reject(res);
      });
  }

  refreshToken() {
    // To Save Multiple Async RefreshToken Request
    if (this.refreshingToken) {
      this.$log.warn('Refresh token request already sent.');
      return this.$q.reject({ warning: 'Refresh token request already sent.' });
    }

    this.refreshingToken = true; // Set refresh_token reuqest tracker flag
    return this
      .$http.post(
      `${this.ACCOUNTS_APP}/oauth/token`,
      { refresh_token: this.Session.read('oauth').refresh_token },
      {
        ignoreAuthModule: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest(obj) {
          const str = Object.keys(obj)
                  .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
          return str.join('&');
        },
      })
      .then(res => {
        this.Session.create('oauth', res.data);
        this.refreshingToken = false; // reset refresh_token reuqest tracker flag

        this // confirm login and replace token in buffered requests
          .authService
          .loginConfirmed('success', config => {
            const conf = config;
            conf.headers.Authorization = `Bearer ${this.Session.accessToken}`;
            return conf;
          });
      })
      .catch(err => {
        this.refreshingToken = false; // reset refresh_token reuqest tracker flag
        this.Session.destroy();
        if (err.status === 400) this.Reauth.open(); // show re-login modal
      });
  }

  logout() {
    /* eslint-disable angular/document-service */
    return this
      .$http
      .post(`${this.ACCOUNTS_APP}/oauth/revoke`, { access_token: this.Session.accessToken }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest(obj) {
          const str = Object.keys(obj)
            .map(p => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
          return str.join('&');
        },
      })
      .then(res => {
        // Destroy Session data
        document.cookie = 'sessionId=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        this.Session.destroy();
        return res;
      })
      .catch(res => {
        document.cookie = 'sessionId=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
        this.Session.destroy();
        return this.$q.reject(res);
      });
  }

  setSessionData() {
    return this.$http.get('/user/me')
      .then(({ data: userinfo }) => {
        this.Session.create('userinfo', userinfo);
      });
  }
}

export default AuthService;
