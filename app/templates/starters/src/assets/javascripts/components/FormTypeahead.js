/* ========================================
 * Form - Typeahead
 * ========================================
 *
 * https://github.com/twitter/typeahead.js/
 */

'use strict'

import $ from 'jquery';
import typeahead from 'typeahead.js/dist/typeahead.jquery.js';

class FormTypeahead {
  constructor() {
    this.$typeAhead = $('.js-Form-item-typeahead');
  }

  init() {
    this.$typeAhead.typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
      classNames: {
        input: 'Form-typeahead-input',
        hint: 'Form-typeahead-hint',
        menu: 'Form-typeahead-menu',
        dataset: 'Form-typeahead-dataset',
        suggestion: 'Form-typeahead-suggestion',
        empty: 'Form-typeahead-empty',
        open: 'Form-typeahead-open',
        cursor: 'Form-typeahead-cursor',
        highlight: 'Form-typeahead-highlight'
      }
    });
  }
}

export default FormTypeahead;
