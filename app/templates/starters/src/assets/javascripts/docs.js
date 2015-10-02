/* ========================================
 * Docs
 * ======================================== */

'use strict';

import $ from 'jquery';
import app from './app';

import Card from './components/Card';
import Form from './components/Form';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

import DocsNavbar from './docs/DocsNavbar';

$(function() {

  /**
   * Init Card
   */
  new Card().init();

  /**
   * Init Form
   */
  new Form().init();

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
