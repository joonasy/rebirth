/* =======================================
 * Navbar - Default
 * ======================================= */

import { $$, $ } from 'javascripts/utility';
import { hasTouch } from 'javascripts/detect';

class NavbarDefault {
  constructor() {
    const navbarClass = '.js-NavbarDefault';
    const navbar = $$(navbarClass);

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

          const isCtrlTrigger = e.target.classList.contains(
            'Navbar-ctrl-trigger',
          );

          if (isCtrlTrigger) {
            const parent = e.target.closest(navbarClass);

            if (parent.classList.contains('is-open')) {
              parent.classList.remove('is-open');
            } else {
              parent.classList.add('is-open');
            }

            e.preventDefault();
          }
        },
        false,
      );
    });

    window.addEventListener('click', (e) => {
      [].forEach.call(navbar, (nav) => nav.classList.remove('is-open'));
    });
  }
}

export default NavbarDefault;
