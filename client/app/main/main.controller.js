class MainController {
  /* @ngInject */
  constructor(Session) {
    this.Session = Session;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
  }
}

export default MainController;
