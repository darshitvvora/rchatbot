class ReauthService {
  /* @ngInject */
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open() {
    this
      .$uibModal
      .open({
        animation: true,
        template: '<reauth></reauth>',
        backdrop: 'static',
      });
  }
}

export default ReauthService;
