/* ========================================
 * Component
 * ======================================== */

var App = App || {};

App.Component = function($) {

  var self = {};

  self.init = function() {}

  self.publicFunction = function() {}

  _privateFunction = function() {}

  return {
    init: self.init
  }
}(jQuery);
