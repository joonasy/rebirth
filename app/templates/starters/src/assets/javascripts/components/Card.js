/* ========================================
 * Card
 * ======================================== */

'use strict';

import $ from 'jquery';
import figureImgAsBg from '../plugins/figureImgAsBg';

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

export default Card;
