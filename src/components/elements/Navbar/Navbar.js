/* ========================================
 * Navbar
 * ======================================== */

import $ from 'jquery'
import classToggle from '../../../javascripts/plugins/classToggle'

class Navbar {
  constructor() {
    this.$navbar = $('.js-Navbar')
  }

  init() {
    if (this.$navbar.length) {
      this.navbar()
    }
  }

  navbar() {
    classToggle({
      trigger: '.js-Navbar .js-NavbarTrigger',
      element: '.js-Navbar',
      toggleClosest: true,
    })

    classToggle({
      trigger: '.js-Navbar .Navbar-trigger',
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false,
    })

    $('.js-Navbar .Navbar-trigger').parent().addClass('has-dropdown')

    classToggle({
      trigger: '.js-Navbar .has-dropdown > .Navbar-link',
      element: '.js-Navbar .Navbar-item',
      toggleClosest: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false,
    })
  }
}

export default Navbar
