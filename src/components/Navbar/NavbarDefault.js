/* =======================================
 * Navbar - Default
 * ======================================= */

import { $$, $ } from 'javascripts/utility';
import { hasTouch } from 'javascripts/feature';

export default class NavbarDefault {
  constructor() {
    const navbarClass = '.js-NavbarDefault';
    const navbar = $$(navbarClass);
    const navbarTrigger = $$('.js-NavbarDefaultTrigger');
    const navbarItem = $$('.js-NavbarDefault .Navbar-item');

    [].forEach.call(navbar, (nav) => {
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

    [].forEach.call(navbarTrigger, (trigger) => {
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
      [].forEach.call(navbarItem, (item) => item.classList.remove('is-open'));
      [].forEach.call(navbar, (nav) => nav.classList.remove('is-open'));
    });
  }
}
