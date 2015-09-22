/* ========================================
 * Hero
 * ======================================== */

'use strict';

import $ from 'jquery';
import figureImgAsBg from '../plugins/figureImgAsBg';

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

export default Hero;
