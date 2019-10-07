(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = 'function' == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = 'MODULE_NOT_FOUND'), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t,
        );
      }
      return n[i].exports;
    }
    for (
      var u = 'function' == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        'use strict';

        var _feature = require('./javascripts/feature');

        /* =======================================
         * App Head
         * ======================================= */
        var doc = document;
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
        exports.hasTouch = void 0;

        /* =======================================
         * Features & User Agents
         * ======================================= */
        var ua = navigator.userAgent;
        var win = window;
        var doc = document;
        /**
         * Tests if touch events are supported, but doesn't necessarily reflect a
         * touchscreen device
         */

        var hasTouch = !!(
          'ontouchstart' in win ||
          (win.navigator && win.navigator.msPointerEnabled && win.MSGesture) ||
          (win.DocumentTouch && doc instanceof DocumentTouch)
        );
        /**
         * Internet Explorer
         */

        exports.hasTouch = hasTouch;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaGVhZC5qcyIsInNyYy9qYXZhc2NyaXB0cy9mZWF0dXJlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNJQTs7QUFKQTs7O0FBTUEsSUFBTSxHQUFHLEdBQUcsUUFBWjtBQUNBLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxlQUFqQjtBQUVBLElBQUksQ0FBQyxTQUFMLEdBQWlCLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZixDQUF1QixtQkFBdkIsRUFBNEMsVUFBNUMsQ0FBakI7O0FBRUEsSUFBSSxpQkFBSixFQUFjO0FBQ1osRUFBQSxJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWYsQ0FBbUIsaUJBQW5CO0FBQ0QsQ0FGRCxNQUVPO0FBQ0wsRUFBQSxJQUFJLENBQUMsU0FBTCxDQUFlLEdBQWYsQ0FBbUIsZ0JBQW5CO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7QUNmRDs7O0FBSUEsSUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQXJCO0FBQ0EsSUFBTSxHQUFHLEdBQUcsTUFBWjtBQUNBLElBQU0sR0FBRyxHQUFHLFFBQVo7QUFFQTs7Ozs7QUFJTyxJQUFNLFFBQVEsR0FBRyxDQUFDLEVBQ3ZCLGtCQUFrQixHQUFsQixJQUNDLEdBQUcsQ0FBQyxTQUFKLElBQWlCLEdBQUcsQ0FBQyxTQUFKLENBQWMsZ0JBQS9CLElBQW1ELEdBQUcsQ0FBQyxTQUR4RCxJQUVDLEdBQUcsQ0FBQyxhQUFKLElBQXFCLEdBQUcsWUFBWSxhQUhkLENBQWxCO0FBTVA7Ozs7OztBQUdPLFNBQVMsSUFBVCxHQUFnQjtBQUNyQixTQUNFLENBQUMsQ0FBQyxRQUFRLENBQUMsK0NBQUQsQ0FBUixFQUFGLElBQWlFO0FBQ2pFLHFDQUFtQyxJQUFuQyxDQUF3QyxTQUFTLENBQUMsU0FBbEQsQ0FGRjtBQUlEO0FBRUQ7Ozs7O0FBR08sU0FBUyxLQUFULEdBQWlCO0FBQ3RCLFNBQU8sa0JBQWtCLElBQWxCLENBQXVCLFNBQVMsQ0FBQyxTQUFqQyxDQUFQO0FBQ0Q7QUFFRDs7Ozs7QUFHTyxTQUFTLFNBQVQsR0FBcUI7QUFDMUIsU0FDRSxFQUFFLENBQUMsT0FBSCxDQUFXLFNBQVgsSUFBd0IsQ0FBQyxDQUF6QixJQUNBLEVBQUUsQ0FBQyxPQUFILENBQVcsYUFBWCxJQUE0QixDQUFDLENBRDdCLElBRUEsRUFBRSxDQUFDLE9BQUgsQ0FBVyxhQUFYLElBQTRCLENBQUMsQ0FIL0I7QUFLRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQXBwIEhlYWRcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyBoYXNUb3VjaCB9IGZyb20gJy4vamF2YXNjcmlwdHMvZmVhdHVyZSc7XG5cbmNvbnN0IGRvYyA9IGRvY3VtZW50O1xuY29uc3QgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG5cbmh0bWwuY2xhc3NOYW1lID0gaHRtbC5jbGFzc05hbWUucmVwbGFjZSgvKF58XFxzKW5vLWpzKFxcc3wkKS8sICcgaGFzLWpzICcpO1xuXG5pZiAoaGFzVG91Y2gpIHtcbiAgaHRtbC5jbGFzc0xpc3QuYWRkKCdoYXMtdG91Y2hldmVudHMnKTtcbn0gZWxzZSB7XG4gIGh0bWwuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2hldmVudHMnKTtcbn1cbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogRmVhdHVyZXMgJiBVc2VyIEFnZW50c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbmNvbnN0IHdpbiA9IHdpbmRvdztcbmNvbnN0IGRvYyA9IGRvY3VtZW50O1xuXG4vKipcbiAqIFRlc3RzIGlmIHRvdWNoIGV2ZW50cyBhcmUgc3VwcG9ydGVkLCBidXQgZG9lc24ndCBuZWNlc3NhcmlseSByZWZsZWN0IGFcbiAqIHRvdWNoc2NyZWVuIGRldmljZVxuICovXG5leHBvcnQgY29uc3QgaGFzVG91Y2ggPSAhIShcbiAgJ29udG91Y2hzdGFydCcgaW4gd2luIHx8XG4gICh3aW4ubmF2aWdhdG9yICYmIHdpbi5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCAmJiB3aW4uTVNHZXN0dXJlKSB8fFxuICAod2luLkRvY3VtZW50VG91Y2ggJiYgZG9jIGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaClcbik7XG5cbi8qKlxuICogSW50ZXJuZXQgRXhwbG9yZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSUUoKSB7XG4gIHJldHVybiAoXG4gICAgISFGdW5jdGlvbignLypAY2Nfb24gcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50TW9kZT09PTEwQCovJykoKSB8fCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgLyg/Olxcc1RyaWRlbnRcXC83XFwuMC4qXFxzcnY6MTFcXC4wKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgKTtcbn1cblxuLyoqXG4gKiBpT1NcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzSU9TKCkge1xuICByZXR1cm4gL2lQKGFkfGhvbmV8b2QpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbn1cblxuLyoqXG4gKiBBbmRyb2lkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0FuZHJvaWQoKSB7XG4gIHJldHVybiAoXG4gICAgdWEuaW5kZXhPZignQW5kcm9pZCcpID4gLTEgJiZcbiAgICB1YS5pbmRleE9mKCdNb3ppbGxhLzUuMCcpID4gLTEgJiZcbiAgICB1YS5pbmRleE9mKCdBcHBsZVdlYktpdCcpID4gLTFcbiAgKTtcbn1cbiJdfQ==
