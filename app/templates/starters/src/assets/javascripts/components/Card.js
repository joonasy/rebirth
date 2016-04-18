/* ========================================
 * Card
 * ======================================== */

'use strict'

import $ from 'jquery';
import imgToParentBg from '../lib/imgToParentBg';

class Card {
  constructor() {
    this.$cardFigure = $('.Card-figure.-figureFill figure, .Card-figure.-figureCrop figure');
  }

  init() {
    this.cardImgToParentBg();
  }

  cardImgToParentBg() {
    imgToParentBg(this.$cardFigure);
  }
}

export default Card;
