/* ========================================
 * Block
 * ======================================== */

var app = app || {};

app.Block = function($) {

  var self = {},
      $blockFigure = $('.Block-figure.-bg-fill > figure');

  self.init = function() {
    figureImgAsBg();
  }

  var figureImgAsBg = function() {
    app.figureImgAsBg($blockFigure);
  }

  return {
    init: self.init
  }
}(jQuery);
