/* ========================================
 * Form
 * ======================================== */

'use strict';

import $ from 'jquery';

class Form {
  constructor() {
    this.$form = $('.js-Form');
    this.$selectItem = $('.Form-item--select', this.$form);
  }

  init() {
    this.updateSelect();
  }

  updateSelect() {
    $(document).on('change', this.$selectItem.selector, function(e) {
      const $this = $(this).find('select');
      const option = $this.find('option:selected').text();

      $this.parent().siblings('.Form-item--select-text').text(option);
    });
  }
}

export default Form;
