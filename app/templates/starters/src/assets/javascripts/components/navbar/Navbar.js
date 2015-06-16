/* ========================================
 * Navbar
 * ======================================== */

'use strict';

var $ = require('jquery');
var toggle = require('../plugins/toggle');

var navbar = function() {

  var self = {};

  self.init = function() {
    var $navBar = $('.js-Navbar');
    var $navBarTrigger = $('.js-Navbar-trigger', $navBar);
    var $navItem = $('.Navbar-item', $navBar);
    var $navSubTrigger = $('.Navbar-subTrigger', $navBar);
    var $navLink = $('.Navbar-link', $navBar).filter(function() {
          return $(this).siblings($navSubTrigger).length;
        });

    toggle({
      trigger: $navBarTrigger,
      element: $navBar
    });

    toggle({
      trigger: $navSubTrigger,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      unToggleOtherToggles: false
    });

    toggle({
      trigger: $navLink,
      element: $navItem,
      toggleParent: true,
      unToggleParentSiblings: true,
      disableFirstClickOnTouch: true,
      unToggleOtherToggles: false
    });
  }

  return {
    init: self.init
  }
};

module.exports = navbar();
