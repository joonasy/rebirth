/* ========================================
 * Button
 * ======================================== */

'use strict';

import $ from 'jquery';
import toggle from '../plugins/toggle';

class Button {
  constructor() {
    this.$button = $('.js-Button');
  }

  init() {
    this.openButtonDropdown();
  }

  openButtonDropdown() {
    $.each(this.$button, function() {
      toggle({
        trigger: $(this),
        element: $(this),
        elementStopPropagation: $(this).find('.Button-dropdown')
      });
    });
  }
}

export default Button;
