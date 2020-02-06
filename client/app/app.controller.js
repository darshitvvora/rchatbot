class AppController {
  /* @ngInject */
  constructor($rootScope, $state, Session, urls) {
    this.$rootScope = $rootScope;
    this.$state = $state;
    this.Session = Session;
    const user = Session.read('userinfo') || {};
    const isUnRegistered = user.client && user.client.is_registered === false;

    this.app = {
      name: 'Extension | QuezX',
      version: '1.0.0',
      settings: {
        themeID: 1,
        navbarHeaderColor: 'bg-primary',
        navbarCollapseColor: 'bg-primary',
        asideColor: 'bg-primary bg-gd-dk',
        headerFixed: true,
        asideFixed: true,
        asideFolded: true,
        asideDock: true,
        container: false,
        offScreen: false, // flag for show of sidebar for mobile view
        mobileHeader: false, // flag to show header Nav and Search in mobile view
        changePassword: `${urls.ACCOUNTS_APP}/settings/password-change`,
      },
      isUnRegistered,
    };
  }

  $onInit() {
    // keeps track of state change and hides sidebar view for mobile
    /* eslint angular/on-watch: 0 */
    this.appClass = {
      'app-header-fixed': true,
      'app-aside-fixed': true,
      'app-aside-folded': this.app.settings.asideFolded,
      'app-aside-dock': this.app.settings.asideDock,
      container: false,
    };

    this.$rootScope.$on('$stateChangeStart', () => {
      this.app.settings.offScreen = false;
      this.app.settings.mobileHeader = false;
    });
  }
}

export default AppController;
