/* ========================================
 * Docs navbar
 * ======================================== */

'use strict';

import $ from 'jquery';
import toggle from '../plugins/toggle';

class DocsNavbar {
  constructor() {
    this.$navBar = $('#js-docs-Navbar');
    this.$navBarTrigger = $('#js-docs-Navbar-trigger', this.$navBar),
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

export default DocsNavbar;

