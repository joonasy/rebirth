/* ========================================
 * Navbar
 * ======================================== */

var app = app || {};

app.Navbar = function($) {

  var self = {};

  self.init = function() {
    var $navBar = $('.js-Navbar'),
        $navBarTrigger = $('.js-Navbar-trigger', $navBar),
        $navItem = $('.Navbar-item', $navBar),
        $navSubTrigger = $('.Navbar-subTrigger', $navBar),
        $navLink = $('.Navbar-link', $navBar).filter(function() {
          return $(this).siblings($navSubTrigger).length;
        });

    app.toggle({
      trigger: $navBarTrigger,
      element: $navBar
    });

    app.toggle({
      trigger: $navSubTrigger,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    app.toggle({
      trigger: $navLink,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false,
      disableFirstClickOnTouch: true
    });
  }

  return {
    init: self.init
  }
}(jQuery);
