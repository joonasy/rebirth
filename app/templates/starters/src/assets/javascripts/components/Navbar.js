/* ========================================
 * Navbar
 * ======================================== */

'use strict';

import $ from 'jquery';
import toggle from '../plugins/toggle';

class Navbar {
  constructor() {
    this.$nav = $('.js-Navbar');
    this.$navSelfTrigger = $('.js-NavbarSelfTrigger', this.$nav);
    this.$navItem = $('.Navbar-item', this.$nav);
    this.$navTrigger = $('.Navbar-trigger', this.$nav);
    this.$navLink = $('.Navbar-link', this.$nav).filter(function() {
          return $(this).siblings(this.$navTrigger).length;
        });
  }

  init() {
    this.navbarInit();
  }

  navbarInit() {
    toggle({
      trigger: this.$navSelfTrigger,
      element: this.$nav
    });

    toggle({
      trigger: this.$navTrigger,
      element: this.$navItem,
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    toggle({
      trigger: this.$navLink,
      element: this.$navItem,
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: $(window).width() > 1024,
      unToggleOtherToggles: false
    });
  }
}

export default Navbar;
