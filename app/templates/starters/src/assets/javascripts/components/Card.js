/* ========================================
 * Card
 * ======================================== */

import $ from 'jquery';
import fixObjectFitImage from '../lib/fixObjectFitImage';

class Card {
  constructor() {
    this.$cardFillOrCrop = $('.Card.-figureFill, .Card.-figureCrop');
    this.$cardFigure = $('.Card-figure figure', this.$cardFillOrCrop);
  }

  init() {
    this.cardImgToParentBg();
  }

  cardImgToParentBg() {
    fixObjectFitImage(this.$cardFigure);
  }
}

export default Card;
