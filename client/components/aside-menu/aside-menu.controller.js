class MenuController {
  /* @ngInject */
  constructor($http, Session, $rootScope) {
    this.$http = $http;
    this.Session = Session;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
  }
}

export default MenuController;
