/* ========================================
 * Hero
 * ======================================== */

var App = App || {};

App.Hero = function($) {

  var self = {},
      $hero = $('.js-Hero'),
      $figure = $('.Hero-figure', $hero);

  self.init = function() {
    _figureImgAsBg();
  }

  _figureImgAsBg = function() {
    App.figureImgAsBg($figure);
  }

  return {
    init: self.init
  }
}(jQuery);
