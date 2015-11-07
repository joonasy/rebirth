/* ========================================
 * Card
 * ======================================== */

'use strict'

import $ from 'jquery';
import imgToParentBg from '../lib/imgToParentBg';

class Card {
  constructor() {
    this.$cardFigure = $('.Card-figure.-bg-fill > figure');
  }

  init() {
    this.cardImgToParentBg();
  }

  cardImgToParentBg() {
    imgToParentBg(this.$cardFigure);
  }
}

export default Card;
