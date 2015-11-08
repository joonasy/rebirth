/* ========================================
 * Button
 * ======================================== */

'use strict'

import $ from 'jquery';
import classToggle from '../lib/classToggle';

class Button {
  constructor() {}

  init() {
    this.openButtonDropdown();
  }

  openButtonDropdown() {
    new classToggle({
      trigger: '.js-Button',
      triggerClass: 'is-open',
      elementStopPropagation: '.Button-dropdown'
    });
  }
}

export default Button;
