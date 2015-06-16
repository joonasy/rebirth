/* ========================================
 * Hero
 * ======================================== */

 'use strict';

 var $ = require('jquery');
 var figureImgAsBg = require('../plugins/figureImgAsBg');

 var hero = function() {

  var self = {};
  var $hero = $('.js-Hero');
  var $figure = $('.Hero-figure', $hero);

  self.init = function() {
    heroFigureAsBg();
  }

  var heroFigureAsBg = function() {
    figureImgAsBg($figure);
  }

  return {
    init: self.init
  }
};

module.exports = hero();
