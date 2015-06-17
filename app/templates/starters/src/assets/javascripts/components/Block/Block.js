/* ========================================
 * Block
 * ======================================== */

'use strict';

var $ = require('jquery');
var figureImgAsBg = require('../plugins/figureImgAsBg');

var block = function() {

  var self = {},
      $blockFigure = $('.Block-figure.-bg-fill > figure');

  self.init = function() {
    figureImgAsBg();
  }

  var blockImgAsBg = function() {
    figureImgAsBg($blockFigure);
  }

  return {
    init: self.init
  }
}();

module.exports = hero();
