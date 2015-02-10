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
  SMALL_UP_NUM: 500,
  SMALL_UP: 'screen and (min-width: 500px)',
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

App.getScrollPosition = function() {
  App.SCROLL_POSITION = $(window).scrollTop();
};

$(function() {
  App.getWindowSize();
  App.getScrollPosition();
});

$window.on('resize', App.getWindowSize);
$window.on('scroll', App.getScrollPosition);