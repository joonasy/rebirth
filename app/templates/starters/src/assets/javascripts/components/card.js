/* ========================================
 * Card
 * ======================================== */

'use strict';

var $ = require('jquery');
var figureImgAsBg = require('../plugins/figureImgAsBg');

class Card {
  constructor() {
    this.$cardFigure = $('.Card-figure.-bg-fill > figure');
  }

  init() {
    this.blockImgAsBg();
  }

  blockImgAsBg() {
    figureImgAsBg(this.$cardFigure);
  }
}

module.exports = Card;
