/* ========================================
 * Form
 * ======================================== */

'use strict';

var $ = require('jquery');

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
      var $this = $(this).find('select');
      var option = $this.find('option:selected').text();

      $this.parent().siblings('.Form-item--select-text').text(option);
    });
  }
}

module.exports = Form;
