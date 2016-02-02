/* ========================================
 * Application
 * ======================================== */

'use strict'

import $ from 'jquery';
import fastClick from 'fastclick';
import Component from './components/Component';

$(function() {
  new Component().init();
  fastClick(document.body);
});
