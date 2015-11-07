/* ========================================
 * Button
 * ======================================== */

'use strict'

import $ from 'jquery';
import classToggle from '../utils/classToggle';

class Button {
  constructor() {
    this.$button = $('.js-Button');
  }

  init() {
    this.openButtonDropdown();
  }

  openButtonDropdown() {
    $.each(this.$button, function() {
      classToggle({
        trigger: $(this),
        elementStopPropagation: $(this).find('.Button-dropdown')
      });
    });
  }
}

export default Button;
