class NavbarController {
  /* @ngInject */
  constructor($rootScope, $state, $window, Auth, Session, urls) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.$window = $window;
    this.Auth = Auth;
    this.Session = Session;
    this.ACCOUNTS_LOGOUT =
      `${urls.ACCOUNTS_APP}/logout?continue=${
      encodeURIComponent('/signin?client_id=extensionquezx&state=/main/dashboard')}`;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    if (!this.user) return;
  }

  logout() {
    const location = this.$window.location;

    // Initiate logout
    this
      .Auth
      .logout()
      .then(
        () => (location.href = this.ACCOUNTS_LOGOUT),
        () => (location.href = this.ACCOUNTS_LOGOUT)
      );
  }
}

export default NavbarController;
