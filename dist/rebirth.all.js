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
        require('app');
        require('components/Navbar/starters/stacked');
      },
      { app: 2, 'components/Navbar/starters/stacked': 6 },
    ],
    2: [
      function(require, module, exports) {
        'use strict';
        require('./components/Navbar');
      },
      { './components/Navbar': 4 },
    ],
    3: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var _utility = require('javascripts/utility');

        var _feature = require('javascripts/feature');

        function _toConsumableArray(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          } else {
            return Array.from(arr);
          }
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        /* =======================================
         * Navbar - Default
         * ======================================= */

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
                    []
                      .concat(_toConsumableArray(parent.parentNode.childNodes))
                      .filter(function(item) {
                        if (
                          item.classList &&
                          item.classList.contains('is-open')
                        ) {
                          item.classList.remove('is-open');
                        } else {
                          parent.classList.add('is-open');
                        }
                      });
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
            [].forEach.call(nav, function(nav) {
              return nav.classList.remove('is-open');
            });
          });
        };

        exports.default = NavbarDefault;
      },
      { 'javascripts/feature': 7, 'javascripts/utility': 8 },
    ],
    4: [
      function(require, module, exports) {
        'use strict';

        var _NavbarDefault = require('./NavbarDefault');

        var _NavbarDefault2 = _interopRequireDefault(_NavbarDefault);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        new _NavbarDefault2.default();
        /* ========================================
         * Navbar
         * ======================================== */
      },
      { './NavbarDefault': 3 },
    ],
    5: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });

        var _utility = require('javascripts/utility');

        var _feature = require('javascripts/feature');

        function _toConsumableArray(arr) {
          if (Array.isArray(arr)) {
            for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          } else {
            return Array.from(arr);
          }
        }

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }
        /* =======================================
         * Navbar - Stacked
         * ======================================= */

        var NavbarStacked = function NavbarStacked() {
          _classCallCheck(this, NavbarStacked);

          var navbarClass = '.js-NavbarStacked';
          var navbar = (0, _utility.$$)(navbarClass);
          var navbarTrigger = (0, _utility.$$)('.js-NavbarStackedTrigger');
          var navbarItem = (0, _utility.$$)('.js-NavbarStacked .Navbar-item');

          navbar.forEach(function(nav) {
            nav.addEventListener(
              'click',
              function(e) {
                var isTrigger = e.target.className === 'Navbar-trigger';
                var isLink = e.target.className === 'Navbar-link';
                var parent = e.target.closest('.Navbar-item');
                var hasDropdown = $('.Navbar-sub', parent);
                e.stopPropagation();

                if (isTrigger || (isLink && _feature.hasTouch && hasDropdown)) {
                  e.preventDefault();

                  if (parent.classList.contains('is-open')) {
                    parent.classList.remove('is-open');
                  } else {
                    []
                      .concat(_toConsumableArray(parent.parentNode.childNodes))
                      .filter(function(item) {
                        if (
                          item.classList &&
                          item.classList.contains('is-open')
                        ) {
                          item.classList.remove('is-open');
                        } else {
                          parent.classList.add('is-open');
                        }
                      });
                  }
                }
              },
              false,
            );
          });

          navbarTrigger.forEach(function(trigger) {
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
            navbarItem.forEach(function(item) {
              return item.classList.remove('is-open');
            });
            navbar.forEach(function(nav) {
              return nav.classList.remove('is-open');
            });
          });
        };

        exports.default = NavbarStacked;
      },
      { 'javascripts/feature': 7, 'javascripts/utility': 8 },
    ],
    6: [
      function(require, module, exports) {
        'use strict';

        var _NavbarStacked = require('./NavbarStacked');

        var _NavbarStacked2 = _interopRequireDefault(_NavbarStacked);

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        new _NavbarStacked2.default();
      },
      { './NavbarStacked': 5 },
    ],
    7: [
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
    8: [
      function(require, module, exports) {
        'use strict';

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        /* ========================================
         * Utility
         * ======================================== */

        /**
         * Select the first match only, context is optional
         */
        var $ = (exports.$ = function $(selector, context) {
          return (context || document).querySelector(selector);
        });

        /**
         * Select a list of matching elements, context is optional
         */
        var $$ = (exports.$$ = function $$(selector, context) {
          return (context || document).querySelectorAll(selector);
        });

        /**
         * Select matching id
         */
        var $id = (exports.$id = function $id(id) {
          return document.getElementById(id);
        });

        /**
         * Select matching tags
         */
        var $tag = (exports.$tag = function $tag(tag) {
          return document.getElementsByTagName(tag);
        });
      },
      {},
    ],
  },
  {},
  [1],
);
