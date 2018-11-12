/* =======================================
 * Navbar - Stacked
 * ======================================= */

import { $$ } from 'javascripts/utility';
import { hasTouch } from 'javascripts/feature';

export default class NavbarStacked {
  constructor() {
    const navbarClass = '.js-NavbarStacked';
    const navbar = $$(navbarClass);
    const navbarTrigger = $$('.js-NavbarStackedTrigger');
    const navbarItem = $$('.js-NavbarStacked .Navbar-item');

    navbar.forEach((nav) => {
      nav.addEventListener(
        'click',
        (e) => {
          const isTrigger = e.target.className === 'Navbar-trigger';
          const isLink = e.target.className === 'Navbar-link';
          const parent = e.target.closest('.Navbar-item');
          const hasDropdown = $('.Navbar-sub', parent);
          e.stopPropagation();

          if (isTrigger || (isLink && hasTouch && hasDropdown)) {
            e.preventDefault();

            if (parent.classList.contains('is-open')) {
              parent.classList.remove('is-open');
            } else {
              [...parent.parentNode.childNodes].filter((item) => {
                if (item.classList && item.classList.contains('is-open')) {
                  item.classList.remove('is-open');
                } else {
                  parent.classList.add('is-open');
                }
              });
            }
          }
        },
        false,
      );
    });

    navbarTrigger.forEach((trigger) => {
      trigger.addEventListener(
        'click',
        (e) => {
          const parent = e.target.closest(navbarClass);
          e.stopPropagation();

          if (parent.classList.contains('is-open')) {
            parent.classList.remove('is-open');
          } else {
            parent.classList.add('is-open');
          }
        },
        false,
      );
    });

    window.addEventListener('click', (e) => {
      navbarItem.forEach((item) => item.classList.remove('is-open'));
      navbar.forEach((nav) => nav.classList.remove('is-open'));
    });
  }
}
