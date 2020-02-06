
class DashboardController {
  /* @ngInject */
  constructor($window, Session) {
    this.$window = $window;
    this.Session = Session;
  }

  $onInit() {
    const user = this.Session.read('userinfo') || {};
    this.userName = user.name || 'Yatish';
  }
}

export default DashboardController;
