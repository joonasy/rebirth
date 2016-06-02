/* ========================================
 * Application
 * ======================================== */

import $ from 'jquery';
window.jQuery = window.$ = $;
import fastClick from 'fastclick';
import Component from './components/Component';

$(() => {
  new Component().init();
  fastClick(document.body);
});
