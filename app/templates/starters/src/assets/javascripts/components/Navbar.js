/* ========================================
 * Navbar
 * ======================================== */

'use strict'

import $ from 'jquery';
import classToggle from '../lib/classToggle';

class Navbar {
  constructor() {
    this.$navbar = $('.js-Navbar');
  }

  init() {
    this.$navbar.length ? this.navbarInit() : false;
  }

  navbarInit() {
    new classToggle({
      trigger: '.js-NavbarSelfTrigger',
      element: '.js-Navbar',
    });

    new classToggle({
      trigger: '.js-Navbar .Navbar-trigger',
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false,
    });

    $('.js-Navbar .Navbar-trigger').parent().addClass('has-dropdown');

    new classToggle({
      trigger: '.js-Navbar .Navbar-item.has-dropdown > .Navbar-link',
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false,
    });
  }
}

export default Navbar;
