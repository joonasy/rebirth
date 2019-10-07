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
      { 'javascripts/feature': 7, 'javascripts/utility': 8 },
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

        Object.defineProperty(exports, '__esModule', {
          value: true,
        });
        exports.default = void 0;

        var _utility = require('javascripts/utility');

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
          }
        }

        var NavbarStacked = function NavbarStacked() {
          _classCallCheck(this, NavbarStacked);

          var navbarClass = '.js-NavbarStacked';
          var navbar = (0, _utility.$$)(navbarClass);
          [].forEach.call(navbar, function(nav) {
            nav.addEventListener(
              'click',
              function(e) {
                var isTrigger = e.target.classList.contains('Navbar-trigger');
                var isLink =
                  e.target.classList.contains('Navbar-link') &&
                  (e.target.getAttribute('href') === null ||
                    e.target.getAttribute('href') === '#');

                if (isTrigger || isLink) {
                  var parent = e.target.closest('.Navbar-item');

                  if (parent.classList.contains('is-open')) {
                    parent.classList.remove('is-open');
                  } else {
                    parent.classList.add('is-open');
                  }

                  e.preventDefault();
                }

                var isCtrlTrigger = e.target.classList.contains(
                  'Navbar-ctrl-trigger',
                );

                if (isCtrlTrigger) {
                  var _parent = e.target.closest(navbarClass);

                  if (_parent.classList.contains('is-open')) {
                    _parent.classList.remove('is-open');
                  } else {
                    _parent.classList.add('is-open');
                  }

                  e.preventDefault();
                }
              },
              false,
            );
          });
        };

        exports.default = NavbarStacked;
      },
      { 'javascripts/utility': 8 },
    ],
    4: [
      function(require, module, exports) {
        'use strict';

        var _NavbarStacked = _interopRequireDefault(require('./NavbarStacked'));

        function _interopRequireDefault(obj) {
          return obj && obj.__esModule ? obj : { default: obj };
        }

        new _NavbarStacked.default();
      },
      { './NavbarStacked': 3 },
    ],
    5: [
      function(require, module, exports) {
        'use strict';

        require('index');

        require('components/Navbar/starters/stacked');
      },
      { 'components/Navbar/starters/stacked': 4, index: 6 },
    ],
    6: [
      function(require, module, exports) {
        'use strict';

        require('./components/Navbar');
      },
      { './components/Navbar': 2 },
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
    8: [
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
  [5],
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9OYXZiYXIvTmF2YmFyRGVmYXVsdC5qcyIsInNyYy9jb21wb25lbnRzL05hdmJhci9pbmRleC5qcyIsInNyYy9jb21wb25lbnRzL05hdmJhci9zdGFydGVycy9zdGFja2VkL05hdmJhclN0YWNrZWQuanMiLCJzcmMvY29tcG9uZW50cy9OYXZiYXIvc3RhcnRlcnMvc3RhY2tlZC9pbmRleC5qcyIsInNyYy9pbmRleC5hbGwuanMiLCJzcmMvaW5kZXguanMiLCJzcmMvamF2YXNjcmlwdHMvZmVhdHVyZS5qcyIsInNyYy9qYXZhc2NyaXB0cy91dGlsaXR5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0lBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUIsYSxHQUNuQix5QkFBYztBQUFBOztBQUNaLE1BQU0sV0FBVyxHQUFHLG1CQUFwQjtBQUNBLE1BQU0sTUFBTSxHQUFHLGlCQUFHLFdBQUgsQ0FBZjtBQUNBLE1BQU0sYUFBYSxHQUFHLGlCQUFHLDBCQUFILENBQXRCO0FBQ0EsTUFBTSxVQUFVLEdBQUcsaUJBQUcsZ0NBQUgsQ0FBbkI7QUFFQSxLQUFHLE9BQUgsQ0FBVyxJQUFYLENBQWdCLE1BQWhCLEVBQXdCLFVBQUMsR0FBRCxFQUFTO0FBQy9CLElBQUEsR0FBRyxDQUFDLGdCQUFKLENBQ0UsT0FERixFQUVFLFVBQUMsQ0FBRCxFQUFPO0FBQ0wsVUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULEtBQXVCLGdCQUF6QztBQUNBLFVBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsU0FBVCxLQUF1QixhQUF0QztBQUNBLFVBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsT0FBVCxDQUFpQixjQUFqQixDQUFmO0FBQ0EsVUFBTSxXQUFXLEdBQUcsZ0JBQUUsYUFBRixFQUFpQixNQUFqQixDQUFw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QVEsQ0FBQyxjQUFULENBQXdCLEVBQXhCLENBQVI7QUFBQSxDQUFaO0FBRVA7Ozs7Ozs7QUFHTyxJQUFNLElBQUksR0FBRyxTQUFQLElBQU8sQ0FBQyxHQUFEO0FBQUEsU0FBUyxRQUFRLENBQUMsb0JBQVQsQ0FBOEIsR0FBOUIsQ0FBVDtBQUFBLENBQWIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE5hdmJhciAtIERlZmF1bHRcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyAkJCwgJCB9IGZyb20gJ2phdmFzY3JpcHRzL3V0aWxpdHknO1xuaW1wb3J0IHsgaGFzVG91Y2ggfSBmcm9tICdqYXZhc2NyaXB0cy9mZWF0dXJlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2YmFyRGVmYXVsdCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IG5hdmJhckNsYXNzID0gJy5qcy1OYXZiYXJEZWZhdWx0JztcbiAgICBjb25zdCBuYXZiYXIgPSAkJChuYXZiYXJDbGFzcyk7XG4gICAgY29uc3QgbmF2YmFyVHJpZ2dlciA9ICQkKCcuanMtTmF2YmFyRGVmYXVsdFRyaWdnZXInKTtcbiAgICBjb25zdCBuYXZiYXJJdGVtID0gJCQoJy5qcy1OYXZiYXJEZWZhdWx0IC5OYXZiYXItaXRlbScpO1xuXG4gICAgW10uZm9yRWFjaC5jYWxsKG5hdmJhciwgKG5hdikgPT4ge1xuICAgICAgbmF2LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICdjbGljaycsXG4gICAgICAgIChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNUcmlnZ2VyID0gZS50YXJnZXQuY2xhc3NOYW1lID09PSAnTmF2YmFyLXRyaWdnZXInO1xuICAgICAgICAgIGNvbnN0IGlzTGluayA9IGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ05hdmJhci1saW5rJztcbiAgICAgICAgICBjb25zdCBwYXJlbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcuTmF2YmFyLWl0ZW0nKTtcbiAgICAgICAgICBjb25zdCBoYXNEcm9wZG93biA9ICQoJy5OYXZiYXItc3ViJywgcGFyZW50KTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgaWYgKGlzVHJpZ2dlciB8fCAoaXNMaW5rICYmIGhhc1RvdWNoICYmIGhhc0Ryb3Bkb3duKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBpZiAocGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBbLi4ucGFyZW50LnBhcmVudE5vZGUuY2hpbGROb2Rlc10uZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0ICYmIGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBmYWxzZSxcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBbXS5mb3JFYWNoLmNhbGwobmF2YmFyVHJpZ2dlciwgKHRyaWdnZXIpID0+IHtcbiAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJlbnQgPSBlLnRhcmdldC5jbG9zZXN0KG5hdmJhckNsYXNzKTtcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgaWYgKHBhcmVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwobmF2YmFySXRlbSwgKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpKTtcbiAgICAgIFtdLmZvckVhY2guY2FsbChuYXZiYXIsIChuYXYpID0+IG5hdi5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJykpO1xuICAgIH0pO1xuICB9XG59XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE5hdmJhclxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmltcG9ydCBOYXZiYXJEZWZhdWx0IGZyb20gJy4vTmF2YmFyRGVmYXVsdCc7XG5cbm5ldyBOYXZiYXJEZWZhdWx0KCk7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIE5hdmJhciAtIFN0YWNrZWRcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5pbXBvcnQgeyAkJCB9IGZyb20gJ2phdmFzY3JpcHRzL3V0aWxpdHknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXJTdGFja2VkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgbmF2YmFyQ2xhc3MgPSAnLmpzLU5hdmJhclN0YWNrZWQnO1xuICAgIGNvbnN0IG5hdmJhciA9ICQkKG5hdmJhckNsYXNzKTtcblxuICAgIFtdLmZvckVhY2guY2FsbChuYXZiYXIsIChuYXYpID0+IHtcbiAgICAgIG5hdi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzVHJpZ2dlciA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnTmF2YmFyLXRyaWdnZXInKTtcbiAgICAgICAgICBjb25zdCBpc0xpbmsgPVxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdOYXZiYXItbGluaycpICYmXG4gICAgICAgICAgICAoZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09IG51bGwgfHxcbiAgICAgICAgICAgICAgZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09ICcjJyk7XG5cbiAgICAgICAgICBpZiAoaXNUcmlnZ2VyIHx8IGlzTGluaykge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZS50YXJnZXQuY2xvc2VzdCgnLk5hdmJhci1pdGVtJyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBpc0N0cmxUcmlnZ2VyID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFxuICAgICAgICAgICAgJ05hdmJhci1jdHJsLXRyaWdnZXInLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDdHJsVHJpZ2dlcikge1xuICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZS50YXJnZXQuY2xvc2VzdChuYXZiYXJDbGFzcyk7XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IE5hdmJhclN0YWNrZWQgZnJvbSAnLi9OYXZiYXJTdGFja2VkJztcblxubmV3IE5hdmJhclN0YWNrZWQoKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEFwcGxpY2F0aW9uXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogSW1wb3J0IGFsbCBkZWZhdWx0IGNvbXBvbmVudHNcbiAqL1xuaW1wb3J0ICdpbmRleCc7XG5cbi8qKlxuICogSW1wb3J0IGFsbCBzdGFydGVyIGNvbXBvbmVudHNcbiAqL1xuaW1wb3J0ICdjb21wb25lbnRzL05hdmJhci9zdGFydGVycy9zdGFja2VkJztcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQXBwXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBDb21wb25lbnRzXG4gKi9cbmltcG9ydCAnLi9jb21wb25lbnRzL05hdmJhcic7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZlYXR1cmVzICYgVXNlciBBZ2VudHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5jb25zdCB3aW4gPSB3aW5kb3c7XG5jb25zdCBkb2MgPSBkb2N1bWVudDtcblxuLyoqXG4gKiBUZXN0cyBpZiB0b3VjaCBldmVudHMgYXJlIHN1cHBvcnRlZCwgYnV0IGRvZXNuJ3QgbmVjZXNzYXJpbHkgcmVmbGVjdCBhXG4gKiB0b3VjaHNjcmVlbiBkZXZpY2VcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1RvdWNoID0gISEoXG4gICdvbnRvdWNoc3RhcnQnIGluIHdpbiB8fFxuICAod2luLm5hdmlnYXRvciAmJiB3aW4ubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgJiYgd2luLk1TR2VzdHVyZSkgfHxcbiAgKHdpbi5Eb2N1bWVudFRvdWNoICYmIGRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpXG4pO1xuXG4vKipcbiAqIEludGVybmV0IEV4cGxvcmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lFKCkge1xuICByZXR1cm4gKFxuICAgICEhRnVuY3Rpb24oJy8qQGNjX29uIHJldHVybiBkb2N1bWVudC5kb2N1bWVudE1vZGU9PT0xMEAqLycpKCkgfHwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8oPzpcXHNUcmlkZW50XFwvN1xcLjAuKlxcc3J2OjExXFwuMCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICk7XG59XG5cbi8qKlxuICogaU9TXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lPUygpIHtcbiAgcmV0dXJuIC9pUChhZHxob25lfG9kKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5cbi8qKlxuICogQW5kcm9pZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBbmRyb2lkKCkge1xuICByZXR1cm4gKFxuICAgIHVhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmXG4gICAgdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xXG4gICk7XG59XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFV0aWxpdHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFNlbGVjdCB0aGUgZmlyc3QgbWF0Y2ggb25seSwgY29udGV4dCBpcyBvcHRpb25hbFxuICovXG5leHBvcnQgY29uc3QgJCA9IChzZWxlY3RvciwgY29udGV4dCkgPT5cbiAgKGNvbnRleHQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4vKipcbiAqIFNlbGVjdCBhIGxpc3Qgb2YgbWF0Y2hpbmcgZWxlbWVudHMsIGNvbnRleHQgaXMgb3B0aW9uYWxcbiAqL1xuZXhwb3J0IGNvbnN0ICQkID0gKHNlbGVjdG9yLCBjb250ZXh0KSA9PlxuICAoY29udGV4dCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbi8qKlxuICogU2VsZWN0IG1hdGNoaW5nIGlkXG4gKi9cbmV4cG9ydCBjb25zdCAkaWQgPSAoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuLyoqXG4gKiBTZWxlY3QgbWF0Y2hpbmcgdGFnc1xuICovXG5leHBvcnQgY29uc3QgJHRhZyA9ICh0YWcpID0+IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4iXX0=
