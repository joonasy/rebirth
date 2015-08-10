/* ========================================
 * Emulate CSS3 transition end
 * ======================================== */

'use strict';

var $ = require('jquery');

var emulateTransitionEnd = function() {

  function transitionSupport() {
    var el = document.createElement('app');

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  $.fn.emulateTransitionEnd = function(duration) {
    var called = false;
    var _this = this;

    $(this).one($.support.transition.end, function() {
      called = true
    });

    var callback = function() {
      if (!called) {
        $(_this).trigger($.support.transition.end)
      }
    }

    setTimeout(callback, duration);
    return this;
  }

  $(function() {
    $.support.transition = transitionSupport();
  });

};

module.exports = emulateTransitionEnd();
