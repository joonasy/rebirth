(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == 'function' && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw ((f.code = 'MODULE_NOT_FOUND'), f);
      }
      var l = (n[o] = { exports: {} });
      t[o][0].call(
        l.exports,
        function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        },
        l,
        l.exports,
        e,
        t,
        n,
        r,
      );
    }
    return n[o].exports;
  }
  var i = typeof require == 'function' && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
})(
  {
    1: [
      function(require, module, exports) {
        'use strict';

        var _feature = require('./javascripts/feature');

        var doc = document;
        /* =======================================
         * App Head
         * ======================================= */

        var html = doc.documentElement;

        html.className = html.className.replace(
          /(^|\s)no-js(\s|$)/,
          ' has-js ',
        );

        if (_feature.hasTouch) {
          html.classList.add('has-touchevents');
        } else {
          html.classList.add('no-touchevents');
        }
      },
      { './javascripts/feature': 2 },
    ],
    2: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.isIE = isIE;
        exports.isIOS = isIOS;
        exports.isAndroid = isAndroid;
        /* ========================================
         * Features & User Agents
         * ======================================== */

        var ua = navigator.userAgent;
        var win = window;
        var doc = document;

        /**
         * Tests if touch events are supported, but doesn't necessarily reflect a
         * touchscreen device
         */
        var hasTouch = (exports.hasTouch = !!(
          'ontouchstart' in win ||
          (win.navigator && win.navigator.msPointerEnabled && win.MSGesture) ||
          (win.DocumentTouch && doc instanceof DocumentTouch)
        ));

        /**
         * Internet Explorer
         */
        function isIE() {
          return (
            !!Function('/*@cc_on return document.documentMode===10@*/')() || // eslint-disable-line
            /(?:\sTrident\/7\.0.*\srv:11\.0)/i.test(navigator.userAgent)
          );
        }

        /**
         * iOS
         */
        function isIOS() {
          return /iP(ad|hone|od)/i.test(navigator.userAgent);
        }

        /**
         * Android
         */
        function isAndroid() {
          return (
            ua.indexOf('Android') > -1 &&
            ua.indexOf('Mozilla/5.0') > -1 &&
            ua.indexOf('AppleWebKit') > -1
          );
        }
      },
      {},
    ],
  },
  {},
  [1],
);
