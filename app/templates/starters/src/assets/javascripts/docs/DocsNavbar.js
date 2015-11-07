/* ========================================
 * Docs navbar
 * ======================================== */

'use strict'

import $ from 'jquery';
import classToggle from '../lib/classToggle';

class DocsNavbar {
  constructor() {
    this.$navbar = $('#js-docsNavbar');
    this.$navbarLink = $('.Navbar-link', this.$navbar).filter(function() {
      return $(this).siblings('.Navbar-trigger', this.$navbar).length;
    });
  }

  init() {
    this.$navbar.length ? this.navbarInit() : false;
  }

  navbarInit() {
    new classToggle({
      trigger: '#js-docsNavbarTrigger',
      element: '#js-docsNavbar',
    });

    new classToggle({
      trigger: '#js-docsNavbar .Navbar-trigger',
      element: '#js-docsNavbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false,
    });

    new classToggle({
      trigger: '.' + this.$navbarLink.get(0).className,
      element: '#js-docsNavbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false,
    });
  }
}

export default DocsNavbar;

