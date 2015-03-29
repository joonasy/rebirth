/* ========================================
 * Block
 * ======================================== */

var App = App || {};

App.Block = function($) {

  var self = {},
      $block = $('.js-Block'),
      $figure = $('.Block-figure', $block);

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
