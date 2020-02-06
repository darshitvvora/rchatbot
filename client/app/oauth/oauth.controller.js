class OauthController {
  /* @ngInject */
  constructor(Auth, $window, $location, $state, $log) {
    this.Auth = Auth;
    this.$window = $window;
    this.$location = $location;
    this.$state = $state;
    this.$log = $log;
  }

  $onInit() {
    const query = this.$location.search();
    const location = this.$window.location;

    // Error geting oauth token
    if (query.error) return (this.error = Object.assign({}, query));

    if (query.code) {
      return this
        .Auth
        .login({ code: query.code })
        .then(() => this
          .Auth
          .setSessionData()
          .then(() => {
            location.href = query.state
              ? `${location.origin}${query.state}`
              : this
                .$state
                .href('main.cases.list', {}, { absolute: true });
          })
          .catch(err => {
            if (err.statusCode === 404) location.href = '/subscription';
          })
        )
        .catch(this.$log.error);
    }

    return this.$state.go('main.cases.list'); // landing page
  }
}

export default OauthController;
