/* ========================================
 * Docs
 * ======================================== */

'use strict';

var $ = require('jquery');
var fastClick = require('fastclick');

require('./app.js');

var Block = require('./components/block');
var Form = require('./components/form');
var Hero = require('./components/hero');
var Navbar = require('./components/navbar');

var DocsNavbar = require('./docs/docsNavbar');

$(function() {

  /**
   * Init navbar
   */
  new Navbar().init();

  /**
   * Init block
   */
  new Block().init();

  /**
   * Init form
   */
  new Form().init();

  /**
   * Init hero
   */
  new Hero().init();

  /**
   * Init FastClick
   */
  fastClick(document.body);

  /**
   * Init documentation material
   */
  new DocsNavbar().init();
});
