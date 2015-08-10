/* ========================================
 * Application
 * ======================================== */

'use strict';

var $ = require('jquery');
var fastClick = require('fastclick');

var Component = require('./components/component');

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
