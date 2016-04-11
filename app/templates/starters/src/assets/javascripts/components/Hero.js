/* ========================================
 * Hero
 * ======================================== */

'use strict'

import $ from 'jquery';
import imgToParentBg from '../lib/imgToParentBg';

class Hero {
  constructor() {
    this.$hero = $('.js-Hero');
    this.$figure = $('.Hero-figure', this.$hero);
  }

  init() {
    this.heroFigureToParentBg();
  }

  heroFigureToParentBg() {
    $.each(this.$figure, function() {
      const hasObjPos = $(this).parent().is('[class*="--alignFigure"]');
      imgToParentBg($(this), hasObjPos, hasObjPos);
    });
  }
}

export default Hero;
