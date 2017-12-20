/* ========================================
 * Navbar
 * ======================================== */

import { $, $$, closest } from '../../javascripts/utils'

class Navbar {
  constructor() {
    this.$navbar = $$('.js-Navbar')
    this.$navTrigger = $$('.js-NavbarTrigger')
  }

  init() {
    this.nav()
  }

  nav() {
    [].forEach.call(this.$navTrigger, el => {
      el.addEventListener('click', e => {
        const $parent = closest(e.target, '.js-Navbar')

        if ($parent.classList.contains('is-open')) {
          $parent.classList.remove('is-open')
        } else {
          $parent.classList.add('is-open')
        }
      }, false)
    });

    [].forEach.call(this.$navbar, el => {
      el.addEventListener('click', e => {
        const isTrigger = e.target.className === 'Navbar-trigger'

        if (isTrigger) {
          const $parent = closest(e.target, '.Navbar-item')

          if ($parent.classList.contains('is-open')) {
            $parent.classList.remove('is-open')
          } else {
            $parent.classList.add('is-open')
          }
        }
      }, false)
    });
  }
}

export default Navbar
