/* ========================================
 * Global settings
 * ======================================== */

var App = App || {};

/**
 * Cached common variables
 */
var $html = $('html'),
    $document = $(document),
    $window = $(window);

/**
 * Breakpoints
 */
App.Bp = {
  SMALL_UP_NUM: 600,
  SMALL_UP: 'screen and (min-width: 600px)',
  MEDIUM_UP_NUM: 768,
  MEDIUM_UP: 'screen and (min-width: 768px)',
  LARGE_UP_NUM: 1024,
  LARGE_UP: 'screen and (min-width: 1024px)',
  XLARGE_UP_NUM: 1200,
  XLARGE_UP: 'screen and (min-width: 1200px)'
};

/**
 * Get new window sizes on resize event and
 * scroll position on scroll events
 */
App.getWindowSize = function() {
  App.WINDOW_WIDTH = $window.width();
  App.WINDOW_HEIGHT = $window.height();
  App.DOCUMENT_WIDTH = $document.width();
  App.DOCUMENT_HEIGHT = $document.height();
};

/**
 * TEST & CHANGE!
 */
$document
  .on('ready', App.getWindowSize)

$window
  .on('resize', App.getWindowSize)
  .on('scroll', App.getScrollPosition);


/**
 * Avoid `console` errors in browsers that lack a console.
 */
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());