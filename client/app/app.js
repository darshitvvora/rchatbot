import './app.scss';
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import 'ui-select';

import { routeConfig } from './app.config';
import AppComponent from './app.component';
import constants from './app.constant';
import events from './app.event';
import setupGAnalytics from './app.ga.js';
import Auth from '../components/auth';
import AsideMenu from '../components/aside-menu';
import Navbar from '../components/navbar';
import Spinner from '../components/spinner';
import OAuth from './oauth';
import FourOFour from './four-o-four';
import FourOThree from './four-o-three';
import ThankYou from './thank-you';
import Subscription from './subscription';
import Main from './main';
import Dashboard from './dashboard';
import * as c3 from 'c3';

/* eslint-disable angular/window-service */
window.c3 = c3;

setupGAnalytics('UA-52116787-29');  // Google Analytics

angular
  .module('extensionApp', [
    ngAnimate, ngSanitize, uiRouter, uiBootstrap, ngMessages, AsideMenu, Navbar,
    constants, Auth, OAuth, Main, FourOFour, Subscription, FourOThree, Dashboard,
    ThankYou, Spinner,
    'ui.select',
  ])
  .component('extensionApp', AppComponent)
  .config(routeConfig)
  .run(events);

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['extensionApp'], {
      strictDi: true,
    });
  });
