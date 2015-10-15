/* ========================================
 * Application
 * ======================================== */

'use strict';

import $ from 'jquery';
import fastClick from 'fastclick';
import Component from './components/component';

$(function() {

  /**
   * Init example component
   */
  new Component().init();

  /**
   * Init FastClick
   */
  fastClick(document.body);
});
