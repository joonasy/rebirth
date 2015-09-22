/* ========================================
 * Hero
 * ======================================== */

'use strict';

const $ = require('jquery');
const figureImgAsBg = require('../plugins/figureImgAsBg');

class Hero {
  constructor() {
    this.$hero = $('.js-Hero');
    this.$figure = $('.Hero-figure', this.$hero);
  }

  init() {
    this.heroFigureAsBg();
  }

  heroFigureAsBg() {
    $.each(this.$figure, function() {
      const hasObjPos = $(this).parent().is('[class*="-alignFigure"]') ? true : false;
      figureImgAsBg($(this), hasObjPos, hasObjPos);
    });
  }
}

module.exports = Hero;
