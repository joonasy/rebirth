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

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = void 0;

        var _utility = require('javascripts/utility');

        var _feature = require('javascripts/feature');

        function _toConsumableArray(arr) {
          return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _nonIterableSpread()
          );
        }

        function _nonIterableSpread() {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance',
          );
        }

        function _iterableToArray(iter) {
          if (
            Symbol.iterator in Object(iter) ||
            Object.prototype.toString.call(iter) === '[object Arguments]'
          )
            return Array.from(iter);
        }

        function _arrayWithoutHoles(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }

        var NavbarDefault = function NavbarDefault() {
          _classCallCheck(this, NavbarDefault);

          var navbarClass = '.js-NavbarDefault';
          var navbar = (0, _utility.$$)(navbarClass);
          var navbarTrigger = (0, _utility.$$)('.js-NavbarDefaultTrigger');
          var navbarItem = (0, _utility.$$)('.js-NavbarDefault .Navbar-item');
          [].forEach.call(navbar, function(nav) {
            nav.addEventListener(
              'click',
              function(e) {
                var isTrigger = e.target.className === 'Navbar-trigger';
                var isLink = e.target.className === 'Navbar-link';
                var parent = e.target.closest('.Navbar-item');
                var hasDropdown = (0, _utility.$)('.Navbar-sub', parent);
                e.stopPropagation();

                if (isTrigger || (isLink && _feature.hasTouch && hasDropdown)) {
                  e.preventDefault();

                  if (parent.classList.contains('is-open')) {
                    parent.classList.remove('is-open');
                  } else {
                    _toConsumableArray(parent.parentNode.childNodes).filter(
                      function(item) {
                        if (
                          item.classList &&
                          item.classList.contains('is-open')
                        ) {
                          item.classList.remove('is-open');
                        } else {
                          parent.classList.add('is-open');
                        }
                      },
                    );
                  }
                }
              },
              false,
            );
          });
          [].forEach.call(navbarTrigger, function(trigger) {
            trigger.addEventListener(
              'click',
              function(e) {
                var parent = e.target.closest(navbarClass);
                e.stopPropagation();

                if (parent.classList.contains('is-open')) {
                  parent.classList.remove('is-open');
                } else {
                  parent.classList.add('is-open');
                }
              },
              false,
            );
          });
          window.addEventListener('click', function(e) {
            [].forEach.call(navbarItem, function(item) {
              return item.classList.remove('is-open');
            });
            [].forEach.call(navbar, function(nav) {
              return nav.classList.remove('is-open');
            });
          });
        };

        exports.default = NavbarDefault;
      },
      { 'javascripts/feature': 4, 'javascripts/utility': 5 },
    ],
    2: [
      function(require, module, exports) {
        'use strict';

        var _NavbarDefault = _interopRequireDefault(require('./NavbarDefault'));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        /* =======================================
         * Navbar
         * ======================================= */
        new _NavbarDefault.default();
      },
      { './NavbarDefault': 1 },
    ],
    3: [
      function(require, module, exports) {
        'use strict';

        require('./components/Navbar');
      },
      { './components/Navbar': 2 },
    ],
    4: [
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
    5: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.$tag = exports.$id = exports.$$ = exports.$ = void 0;

        /* =======================================
         * Utility
         * ======================================= */

        /**
         * Select the first match only, context is optional
         */
        var $ = function $(selector, context) {
          return (context || document).querySelector(selector);
        };
        /**
         * Select a list of matching elements, context is optional
         */

        exports.$ = $;

        var $$ = function $$(selector, context) {
          return (context || document).querySelectorAll(selector);
        };
        /**
         * Select matching id
         */

        exports.$$ = $$;

        var $id = function $id(id) {
          return document.getElementById(id);
        };
        /**
         * Select matching tags
         */

        exports.$id = $id;

        var $tag = function $tag(tag) {
          return document.getElementsByTagName(tag);
        };

        exports.$tag = $tag;
      },
      {},
    ],
  },
  {},
  [3],
);
