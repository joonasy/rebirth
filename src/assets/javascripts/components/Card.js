/* ========================================
 * Card
 * ======================================== */

import $ from 'jquery';
import fixObjectFitImage from '../lib/fixObjectFitImage';

class Card {
  constructor() {
    this.$cardFillAndCrop = $('.Card.-figureFill, .Card.-figureCrop');
    this.$cardFigure = $('.Card-figure figure', this.$cardFillAndCrop);
  }

  init() {
    this.cardImgToParentBg();
  }

  cardImgToParentBg() {
    fixObjectFitImage(this.$cardFigure);
  }
}

export default Card;
