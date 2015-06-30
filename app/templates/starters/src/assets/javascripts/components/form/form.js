/* ========================================
 * Form
 * ======================================== */

'use strict';

var $ = require('jquery');

var form = function() {

  var self = {};
  var $form = $('.js-Form');
  var $select = $('.Form-item--select', $form);

  self.init = function() {
    updateSelect();
  }

  var updateSelect = function() {
    $(document).on('change', $select.selector, function(e) {
      var $this = $(this).find('select');
      var option = $this.find('option:selected').text();

      $this.siblings('.Form-item--select-text').text(option);
    });
  }

  return {
    init: self.init
  }
};

module.exports = form();
