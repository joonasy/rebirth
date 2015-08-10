/* ========================================
 * Block
 * ======================================== */

'use strict';

var $ = require('jquery');
var figureImgAsBg = require('../plugins/figureImgAsBg');

class Block {
  constructor() {
    this.$blockFigure = $('.Block-figure.-bg-fill > figure');
  }

  init() {
    this.blockImgAsBg();
  }

  blockImgAsBg() {
    figureImgAsBg(this.$blockFigure);
  }
}

module.exports = Block;
