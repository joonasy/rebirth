/* ========================================
 * Block
 * ======================================== */

var app = app || {};

app.Block = function($) {

  var self = {},
      $blockBg = $('.Block--bg'),
      $figure = $('.Block-figure', $blockBg);

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
