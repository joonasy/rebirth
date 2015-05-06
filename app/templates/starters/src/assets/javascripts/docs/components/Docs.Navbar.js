/* ========================================
 * Docs navbar
 * ======================================== */

var docs = docs || {};

docs.Navbar = function($) {

  var self = {};

  self.init = function() {
    var $navBar = $('#js-docs-Navbar'),
        $navBarTrigger = $('#js-docs-Navbar-trigger', $navBar),
        $navItem = $('.Navbar-item', $navBar),
        $navSubTrigger = $('.Navbar-subTrigger', $navBar),
        $navLink = $('.Navbar-link', $navBar).filter(function() {
          return $(this).siblings($navSubTrigger).length
        });


    app.toggle({
      trigger: $navBarTrigger,
      element: $navBar
    });

    app.toggle({
      trigger: $navSubTrigger.add($navLink),
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });
  }

  return {
    init: self.init
  }
}(jQuery);
