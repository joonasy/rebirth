/* ========================================
 * Component
 * ======================================== */

var app = app || {};

app.Component = function($) {

  var self = {};

  self.init = function() {}

  self.publicFunction = function() {}

  var privateFunction = function() {}

  return {
    init: self.init
  }
}(jQuery);
