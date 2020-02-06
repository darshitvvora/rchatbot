import angular from 'angular';
import SpinnerComponent from './spinner.component';

export default angular
  .module('extensionApp.spinner', [])
  .component('spinner', SpinnerComponent)
  .name;
