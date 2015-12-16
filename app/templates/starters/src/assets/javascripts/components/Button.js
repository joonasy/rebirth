/* ========================================
 * Button
 * ======================================== */

'use strict'

import $ from 'jquery';
import ClassToggle from '../lib/classToggle';

class Button {
  constructor() {}

  init() {
    this.openButtonDropdown();
  }

  openButtonDropdown() {
    new ClassToggle({
      trigger: '.js-Button',
      triggerClass: 'is-open',
      elementStopPropagation: '.Button-dropdown'
    });
  }
}

export default Button;
