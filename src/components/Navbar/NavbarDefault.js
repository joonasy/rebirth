/* ========================================
 * Navbar
 * ======================================== */

import { $, $$ } from '../../javascripts/utility';
import { hasTouch } from '../../javascripts/feature';

export default class NavbarDefault {
  constructor() {
    const navbar = $$('.js-NavbarDefault');
    const navbarTrigger = $$('.js-NavbarDefaultTrigger');
    const navbarItem = $$('.Navbar-item');

    navbar.forEach(nav => {
      nav.addEventListener('click', e => {
        const isTrigger = e.target.className === 'Navbar-trigger';
        const isLink = e.target.className === 'Navbar-link';
        const parent = e.target.closest('.Navbar-item');
        e.stopPropagation();

        if (isLink && hasTouch) e.preventDefault();

        if (isTrigger || isLink && hasTouch) {
          if (parent.classList.contains('is-open')) {
            parent.classList.remove('is-open');
          } else {
            [...parent.parentNode.childNodes].filter(item => {
              if (item.classList && item.classList.contains('is-open')) {
                item.classList.remove('is-open');
              } else {
                parent.classList.add('is-open');
              }
            })
          }
        }
      }, false);
    });

    navbarTrigger.forEach(trigger => {
      trigger.addEventListener('click', e => {
        const parent = e.target.closest('.js-NavbarDefault');
        e.stopPropagation();

        if (parent.classList.contains('is-open')) {
          parent.classList.remove('is-open');
        } else {
          parent.classList.add('is-open');
        }
      }, false)
    });

    window.addEventListener('click', e => {
      if (hasTouch) {
        navbarItem.forEach(item => item.classList.remove('is-open'));
        navbar.forEach(nav => nav.classList.remove('is-open'));
      }
    });
  }
}
