/* =======================================
 * Button
 * ======================================= */

import { $$ } from 'javascripts/utility';

class Button {
  constructor() {
    this.buttonDropdown = $$('.js-ButtonDropdown');
    this.dropdown();
  }

  dropdown() {
    [].forEach.call(this.buttonDropdown, (button) => {
      button.addEventListener(
        'click',
        (e) => {
          e.stopPropagation();

          if (e.target.classList.contains('is-open')) {
            e.target.classList.remove('is-open');
          } else {
            e.target.classList.add('is-open');
          }
        },
        false,
      );
    });

    window.addEventListener('click', (e) => {
      [].forEach.call(this.buttonDropdown, (button) =>
        button.classList.remove('is-open'),
      );
    });
  }
}

export default Button;
