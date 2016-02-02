/* ========================================
 * Navbar
 * ======================================== */

'use strict'

import $ from 'jquery';
import ClassToggle from '../lib/classToggle';

class Navbar {
  constructor() {
    this.$navbar = $('.js-Navbar');
  }

  init() {
    this.$navbar.length ? this.navbarInit() : false;
  }

  navbarInit() {
    new ClassToggle({
      trigger: '.js-Navbar .js-NavbarTrigger',
      element: '.js-Navbar',
      toggleClosest: true
    });

    new ClassToggle({
      trigger: '.js-Navbar .Navbar-trigger',
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    $('.js-Navbar .Navbar-trigger').parent().addClass('has-dropdown');

    new ClassToggle({
      trigger: '.js-Navbar .has-dropdown > .Navbar-link',
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false
    });
  }
}

export default Navbar;
