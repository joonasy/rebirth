/* =======================================
 * Button
 * ======================================= */

import { $$ } from 'javascripts/utility';

class Button {
  constructor() {
    this.button = $$('.js-ButtonDropdown');

    [].forEach.call(this.button, (button) => {
      button.addEventListener(
        'click',
        (e) => {
          e.preventDefault();

          if (e.target.classList.contains('is-open')) {
            e.target.classList.remove('is-open');
          } else {
            e.target.classList.add('is-open');
          }
        },
        false,
      );
    });
  }
}

export default Button;
