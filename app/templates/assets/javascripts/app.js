/* ========================================
 * Application
 * ======================================== */

'use strict';

var $ = require('jquery');
var fastClick = require('fastclick');

var component = require('./components/component');

$(function() {

  /**
   * Init FastClick
   */
  fastClick(document.body);
});
