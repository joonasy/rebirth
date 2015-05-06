/* ========================================
 * Navbar
 * ======================================== */

var App = App || {};

App.Navbar = function($) {

  var self = {};

  self.init = function() {
    var $navBar = $('.js-Navbar'),
        $navBarTrigger = $('.js-Navbar-trigger', $navBar),
        $navItem = $('.Navbar-item', $navBar),
        $navSubTrigger = $('.Navbar-subTrigger', $navBar),
        $navLink = $('.Navbar-link', $navBar).filter(function() {
          return $(this).siblings($navSubTrigger).length;
        });

    App.toggle({
      trigger: $navBarTrigger,
      element: $navBar
    });

    App.toggle({
      trigger: $navSubTrigger,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    App.toggle({
      trigger: $navLink,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true
    });
  }

  return {
    init: self.init
  }
}(jQuery);
