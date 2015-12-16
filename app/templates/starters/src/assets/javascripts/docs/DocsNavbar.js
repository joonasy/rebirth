/* ========================================
 * Docs navbar
 * ======================================== */

'use strict'

import $ from 'jquery';
import ClassToggle from '../lib/classToggle';

class DocsNavbar {
  constructor() {
    this.$navbar = $('#js-docsNavbar');
  }

  init() {
    this.$navbar.length ? this.navbarInit() : false;
  }

  navbarInit() {
    new ClassToggle({
      trigger: '#js-docsNavbarTrigger',
      element: '#js-docsNavbar'
    });

    new ClassToggle({
      trigger: '#js-docsNavbar .Navbar-trigger',
      element: '#js-docsNavbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    $('#js-docsNavbar .Navbar-trigger').parent().addClass('has-dropdown');

    new ClassToggle({
      trigger: '#js-docsNavbar .Navbar-item.has-dropdown > .Navbar-link',
      element: '#js-docsNavbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false
    });
  }
}

export default DocsNavbar;

