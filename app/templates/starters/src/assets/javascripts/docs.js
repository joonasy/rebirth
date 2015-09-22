/* ========================================
 * Docs
 * ======================================== */

'use strict';

var $ = require('jquery');
var fastClick = require('fastclick');

require('./app.js');

var Card = require('./components/Card');
var Form = require('./components/Form');
var Hero = require('./components/Hero');
var Navbar = require('./components/Navbar');

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
