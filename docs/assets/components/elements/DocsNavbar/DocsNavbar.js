/* ========================================
 * Docs navbar
 * ======================================== */

import $ from 'jquery'
import classToggle from '../../../../../src/javascripts/plugins/classToggle'

class DocsNavbar {
  constructor() {
    this.$navbar = $('#js-docsNavbar')
  }

  init() {
    if (this.$navbar.length) {
      this.navbar()
    }
  }

  navbar() {
    classToggle({
      trigger: '#js-docsNavbarTrigger',
      element: '#js-docsNavbar',
    })

    classToggle({
      trigger: '#js-docsNavbar .Navbar-trigger',
      element: '#js-docsNavbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false,
    })

    $('#js-docsNavbar .Navbar-trigger').parent().addClass('has-dropdown')

    classToggle({
      trigger: '#js-docsNavbar .Navbar-item.has-dropdown > .Navbar-link',
      element: '#js-docsNavbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false,
    })
  }
}

export default DocsNavbar

