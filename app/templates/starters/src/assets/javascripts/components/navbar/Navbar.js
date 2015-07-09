/* ========================================
 * Navbar
 * ======================================== */

'use strict';

var $ = require('jquery');
var toggle = require('../plugins/toggle');

class Navbar {
  constructor() {
    this.$navBar = $('.js-Navbar');
    this.$navBarTrigger = $('.js-Navbar-trigger', this.$navBar);
    this.$navItem = $('.Navbar-item', this.$navBar);
    this.$navSubTrigger = $('.Navbar-subTrigger', this.$navBar);
    this.$navLink = $('.Navbar-link', this.$navBar).filter(function() {
          return $(this).siblings(this.$navSubTrigger).length;
        });
  }

  init() {
    this.navbarInit();
  }

  navbarInit() {
    toggle({
      trigger: this.$navBarTrigger,
      element: this.$navBar
    });

    toggle({
      trigger: this.$navSubTrigger,
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
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false
    });
  }
}

module.exports = Navbar;
