/* ========================================
 * Application
 * ======================================== */

$(function() {

  /**
   * Init FastClick
   */
  FastClick.attach(document.body);

  /**
   * Declare page as loaded
   */
  $(window).on("load", function() {
    $('html').removeClass('app-is-loading').addClass('app-is-loaded');
  });
});