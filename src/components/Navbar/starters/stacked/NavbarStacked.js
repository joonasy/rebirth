/* =======================================
 * Navbar - Stacked
 * ======================================= */

import { $$ } from 'javascripts/utility';

export default class NavbarStacked {
  constructor() {
    const navbarClass = '.js-NavbarStacked';
    const navbar = $$(navbarClass);

    [].forEach.call(navbar, (nav) => {
      nav.addEventListener(
        'click',
        (e) => {
          const isTrigger = e.target.classList.contains('Navbar-trigger');

          if (isTrigger) {
            const parent = e.target.closest('.Navbar-item');

            if (parent.classList.contains('is-open')) {
              parent.classList.remove('is-open');
            } else {
              parent.classList.add('is-open');
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
          }
        },
        false,
      );
    });
  }
}
