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