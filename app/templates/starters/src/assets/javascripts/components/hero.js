/* ========================================
 * Hero
 * ======================================== */

'use strict';

var $ = require('jquery');
var figureImgAsBg = require('../plugins/figureImgAsBg');

class Hero {
  constructor() {
    this.$hero = $('.js-Hero');
    this.$figure = $('.Hero-figure', this.$hero);
  }

  init() {
    this.heroFigureAsBg();
  }

  heroFigureAsBg() {
    figureImgAsBg(this.$figure);
  }
}

module.exports = Hero;
