/* ========================================
 * Docs
 * ======================================== */

'use strict';

import $ from 'jquery';
import app from './app';
import Button from './components/Button';
import Card from './components/Card';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import DocsNavbar from './docs/DocsNavbar';

$(function() {

  /**
   * Init Button
   */
  new Button().init();

  /**
   * Init Card
   */
  new Card().init();

  /**
   * Init Hero
   */
  new Hero().init();

  /**
   * Init Navbar
   */
  new Navbar().init();

  /**
   * Init documentation material
   */
  new DocsNavbar().init();
});
