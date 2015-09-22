/* ========================================
 * Setup lazysizes
 * ======================================== */

'use strict';

require('lazysizes');
require('lazysizes/plugins/respimg/ls.respimg.js');

const lazysizes = () => {
  window.lazySizesConfig = window.lazySizesConfig || {};
  window.lazySizesConfig.lazyClass = 'js-lazyload';
  window.lazySizesConfig.loadingClass = 'is-lazyload';
  window.lazySizesConfig.loadedClass = 'is-lazyloaded';
}();

export default lazysizes;
