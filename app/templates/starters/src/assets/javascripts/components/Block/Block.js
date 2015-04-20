/* ========================================
 * Block
 * ======================================== */

var App = App || {};

App.Block = function($) {

  var self = {},
      $blockBg = $('.Block--bg'),
      $figure = $('.Block-figure', $blockBg);

  self.init = function() {
    figureImgAsBg();
  }

  var figureImgAsBg = function() {
    App.figureImgAsBg($figure);
  }

  return {
    init: self.init
  }
}(jQuery);
