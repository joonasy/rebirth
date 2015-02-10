/* ========================================
 * Navbar
 * ======================================== */

var App = App || {};

App.Navbar = function($) {

  var self = {};

  self.init = function() {
    var $navPrimary = $('#js-Navbar'),
        $navPrimaryTrigger = $('#js-Navbar-trigger', $navPrimary),
        $navItem = $('.Nav-item', $navPrimary),
        $navLink = $('.Nav-link', $navPrimary),
        $navSubTrigger = $('.Nav-subTrigger', $navPrimary);

    App.Toggle({
      trigger: $navPrimaryTrigger,
      element: $navPrimary
    });

    App.Toggle({
      trigger: $navSubTrigger,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    App.Toggle({
      trigger: $navLink,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: $navSubTrigger
    });
  }

  return {
    init: self.init
  }
}(jQuery);