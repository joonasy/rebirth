/* ========================================
 * Card
 * ======================================== */

'use strict'

import $ from 'jquery';
import imgToParentBg from '../lib/imgToParentBg';

class Card {
  constructor() {
    this.$cardFigure = $('.Card.--figureFill .Card-figure figure, .Card.-figureCrop .Card-figure figure');
  }

  init() {
    this.cardImgToParentBg();
  }

  cardImgToParentBg() {
    imgToParentBg(this.$cardFigure);
  }
}

export default Card;
