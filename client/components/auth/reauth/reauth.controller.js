class ReauthController {
  /* @ngInject */
  constructor($window, urls) {
    this.LOGIN = urls.LOGIN;
    this.location = $window.location;
  }

  $onInit() {
    const { pathname, search } = this.location;
    this.LOGIN += `&state=${pathname}${search}`;

    if (!this.LOGIN.includes('code=')) this.location.href = this.LOGIN;
  }
}

export default ReauthController;
