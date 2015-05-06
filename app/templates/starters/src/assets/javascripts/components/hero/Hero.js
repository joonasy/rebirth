/* ========================================
 * Hero
 * ======================================== */

var app = app || {};

app.Hero = function($) {

  var self = {},
      $hero = $('.js-Hero'),
      $figure = $('.Hero-figure', $hero);

  self.init = function() {
    figureImgAsBg();
  }

  var figureImgAsBg = function() {
    app.figureImgAsBg($figure);
  }

  return {
    init: self.init
  }
}(jQuery);
