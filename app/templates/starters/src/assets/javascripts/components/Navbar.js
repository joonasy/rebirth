/* ========================================
 * Navbar
 * ======================================== */

'use strict'

import $ from 'jquery';
import classToggle from '../lib/classToggle';

class Navbar {
  constructor() {
    this.$navbar = $('.js-Navbar');
    this.$navbarLink = $('.Navbar-link', this.$navbar).filter(function() {
      return $(this).siblings('.Navbar-trigger', this.$navbar).length;
    });
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
      unToggleOtherToggles: false
    });

    new classToggle({
      trigger: '.' + this.$navbarLink.get().className,
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false
    });
  }
}

export default Navbar;
