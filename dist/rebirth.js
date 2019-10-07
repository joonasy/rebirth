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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tcG9uZW50cy9OYXZiYXIvTmF2YmFyRGVmYXVsdC5qcyIsInNyYy9jb21wb25lbnRzL05hdmJhci9pbmRleC5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9qYXZhc2NyaXB0cy9mZWF0dXJlLmpzIiwic3JjL2phdmFzY3JpcHRzL3V0aWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7O0FDSUE7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQixhLEdBQ25CLHlCQUFjO0FBQUE7O0FBQ1osTUFBTSxXQUFXLEdBQUcsbUJBQXBCO0FBQ0EsTUFBTSxNQUFNLEdBQUcsaUJBQUcsV0FBSCxDQUFmO0FBQ0EsTUFBTSxhQUFhLEdBQUcsaUJBQUcsMEJBQUgsQ0FBdEI7QUFDQSxNQUFNLFVBQVUsR0FBRyxpQkFBRyxnQ0FBSCxDQUFuQjtBQUVBLEtBQUcsT0FBSCxDQUFXLElBQVgsQ0FBZ0IsTUFBaEIsRUFBd0IsVUFBQyxHQUFELEVBQVM7QUFDL0IsSUFBQSxHQUFHLENBQUMsZ0JBQUosQ0FDRSxPQURGLEVBRUUsVUFBQyxDQUFELEVBQU87QUFDTCxVQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsS0FBdUIsZ0JBQXpDO0FBQ0EsVUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxTQUFULEtBQXVCLGFBQXRDO0FBQ0EsVUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxPQUFULENBQWlCLGNBQWpCLENBQWY7QUFDQSxVQUFNLFdBQVcsR0FBRyxnQkFBRSxhQUFGLEVBQWlCLE1BQWpCLENBQXBCO0FBQ0EsTUFBQSxDQUFDLENBQUMsZUFBRjs7QUFFQSxVQUFJLFNBQVMsSUFBSyxNQUFNLElBQUksaUJBQVYsSUFBc0IsV0FBeEMsRUFBc0Q7QUFDcEQsUUFBQSxDQUFDLENBQUMsY0FBRjs7QUFFQSxZQUFJLE1BQU0sQ0FB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LE9BQUgsQ0FBVyxhQUFYLElBQTRCLENBQUMsQ0FEN0IsSUFFQSxFQUFFLENBQUMsT0FBSCxDQUFXLGFBQVgsSUFBNEIsQ0FBQyxDQUgvQjtBQUtEOzs7Ozs7Ozs7O0FDNUNEOzs7O0FBSUE7OztBQUdPLElBQU0sQ0FBQyxHQUFHLFNBQUosQ0FBSSxDQUFDLFFBQUQsRUFBVyxPQUFYO0FBQUEsU0FDZixDQUFDLE9BQU8sSUFBSSxRQUFaLEVBQXNCLGFBQXRCLENBQW9DLFFBQXBDLENBRGU7QUFBQSxDQUFWO0FBR1A7Ozs7Ozs7QUFHTyxJQUFNLEVBQUUsR0FBRyxTQUFMLEVBQUssQ0FBQyxRQUFELEVBQVcsT0FBWDtBQUFBLFNBQ2hCLENBQUMsT0FBTyxJQUFJLFFBQVosRUFBc0IsZ0JBQXRCLENBQXVDLFFBQXZDLENBRGdCO0FBQUEsQ0FBWDtBQUdQOzs7Ozs7O0FBR08sSUFBTSxHQUFHLEdBQUcsU0FBTixHQUFNLENBQUMsRUFBRDtBQUFBLFNBQVEsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsRUFBeEIsQ0FBUjtBQUFBLENBQVo7QUFFUDs7Ozs7OztBQUdPLElBQU0sSUFBSSxHQUFHLFNBQVAsSUFBTyxDQUFDLEdBQUQ7QUFBQSxTQUFTLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixHQUE5QixDQUFUO0FBQUEsQ0FBYiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTmF2YmFyIC0gRGVmYXVsdFxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbmltcG9ydCB7ICQkLCAkIH0gZnJvbSAnamF2YXNjcmlwdHMvdXRpbGl0eSc7XG5pbXBvcnQgeyBoYXNUb3VjaCB9IGZyb20gJ2phdmFzY3JpcHRzL2ZlYXR1cmUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZiYXJEZWZhdWx0IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgbmF2YmFyQ2xhc3MgPSAnLmpzLU5hdmJhckRlZmF1bHQnO1xuICAgIGNvbnN0IG5hdmJhciA9ICQkKG5hdmJhckNsYXNzKTtcbiAgICBjb25zdCBuYXZiYXJUcmlnZ2VyID0gJCQoJy5qcy1OYXZiYXJEZWZhdWx0VHJpZ2dlcicpO1xuICAgIGNvbnN0IG5hdmJhckl0ZW0gPSAkJCgnLmpzLU5hdmJhckRlZmF1bHQgLk5hdmJhci1pdGVtJyk7XG5cbiAgICBbXS5mb3JFYWNoLmNhbGwobmF2YmFyLCAobmF2KSA9PiB7XG4gICAgICBuYXYuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgKGUpID0+IHtcbiAgICAgICAgICBjb25zdCBpc1RyaWdnZXIgPSBlLnRhcmdldC5jbGFzc05hbWUgPT09ICdOYXZiYXItdHJpZ2dlcic7XG4gICAgICAgICAgY29uc3QgaXNMaW5rID0gZS50YXJnZXQuY2xhc3NOYW1lID09PSAnTmF2YmFyLWxpbmsnO1xuICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5OYXZiYXItaXRlbScpO1xuICAgICAgICAgIGNvbnN0IGhhc0Ryb3Bkb3duID0gJCgnLk5hdmJhci1zdWInLCBwYXJlbnQpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBpZiAoaXNUcmlnZ2VyIHx8IChpc0xpbmsgJiYgaGFzVG91Y2ggJiYgaGFzRHJvcGRvd24pKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpIHtcbiAgICAgICAgICAgICAgcGFyZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIFsuLi5wYXJlbnQucGFyZW50Tm9kZS5jaGlsZE5vZGVzXS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QgJiYgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBhcmVudC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGZhbHNlLFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIFtdLmZvckVhY2guY2FsbChuYXZiYXJUcmlnZ2VyLCAodHJpZ2dlcikgPT4ge1xuICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAnY2xpY2snLFxuICAgICAgICAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGUudGFyZ2V0LmNsb3Nlc3QobmF2YmFyQ2xhc3MpO1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICBpZiAocGFyZW50LmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpKSB7XG4gICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJlbnQuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZmFsc2UsXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIFtdLmZvckVhY2guY2FsbChuYXZiYXJJdGVtLCAoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJykpO1xuICAgICAgW10uZm9yRWFjaC5jYWxsKG5hdmJhciwgKG5hdikgPT4gbmF2LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogTmF2YmFyXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuaW1wb3J0IE5hdmJhckRlZmF1bHQgZnJvbSAnLi9OYXZiYXJEZWZhdWx0JztcblxubmV3IE5hdmJhckRlZmF1bHQoKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQXBwXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBDb21wb25lbnRzXG4gKi9cbmltcG9ydCAnLi9jb21wb25lbnRzL05hdmJhcic7XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEZlYXR1cmVzICYgVXNlciBBZ2VudHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5jb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5jb25zdCB3aW4gPSB3aW5kb3c7XG5jb25zdCBkb2MgPSBkb2N1bWVudDtcblxuLyoqXG4gKiBUZXN0cyBpZiB0b3VjaCBldmVudHMgYXJlIHN1cHBvcnRlZCwgYnV0IGRvZXNuJ3QgbmVjZXNzYXJpbHkgcmVmbGVjdCBhXG4gKiB0b3VjaHNjcmVlbiBkZXZpY2VcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc1RvdWNoID0gISEoXG4gICdvbnRvdWNoc3RhcnQnIGluIHdpbiB8fFxuICAod2luLm5hdmlnYXRvciAmJiB3aW4ubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQgJiYgd2luLk1TR2VzdHVyZSkgfHxcbiAgKHdpbi5Eb2N1bWVudFRvdWNoICYmIGRvYyBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpXG4pO1xuXG4vKipcbiAqIEludGVybmV0IEV4cGxvcmVyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lFKCkge1xuICByZXR1cm4gKFxuICAgICEhRnVuY3Rpb24oJy8qQGNjX29uIHJldHVybiBkb2N1bWVudC5kb2N1bWVudE1vZGU9PT0xMEAqLycpKCkgfHwgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIC8oPzpcXHNUcmlkZW50XFwvN1xcLjAuKlxcc3J2OjExXFwuMCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICk7XG59XG5cbi8qKlxuICogaU9TXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0lPUygpIHtcbiAgcmV0dXJuIC9pUChhZHxob25lfG9kKS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG59XG5cbi8qKlxuICogQW5kcm9pZFxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBbmRyb2lkKCkge1xuICByZXR1cm4gKFxuICAgIHVhLmluZGV4T2YoJ0FuZHJvaWQnKSA+IC0xICYmXG4gICAgdWEuaW5kZXhPZignTW96aWxsYS81LjAnKSA+IC0xICYmXG4gICAgdWEuaW5kZXhPZignQXBwbGVXZWJLaXQnKSA+IC0xXG4gICk7XG59XG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIFV0aWxpdHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIFNlbGVjdCB0aGUgZmlyc3QgbWF0Y2ggb25seSwgY29udGV4dCBpcyBvcHRpb25hbFxuICovXG5leHBvcnQgY29uc3QgJCA9IChzZWxlY3RvciwgY29udGV4dCkgPT5cbiAgKGNvbnRleHQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4vKipcbiAqIFNlbGVjdCBhIGxpc3Qgb2YgbWF0Y2hpbmcgZWxlbWVudHMsIGNvbnRleHQgaXMgb3B0aW9uYWxcbiAqL1xuZXhwb3J0IGNvbnN0ICQkID0gKHNlbGVjdG9yLCBjb250ZXh0KSA9PlxuICAoY29udGV4dCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG5cbi8qKlxuICogU2VsZWN0IG1hdGNoaW5nIGlkXG4gKi9cbmV4cG9ydCBjb25zdCAkaWQgPSAoaWQpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuLyoqXG4gKiBTZWxlY3QgbWF0Y2hpbmcgdGFnc1xuICovXG5leHBvcnQgY29uc3QgJHRhZyA9ICh0YWcpID0+IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZyk7XG4iXX0=
