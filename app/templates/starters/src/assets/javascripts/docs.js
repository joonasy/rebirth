/* ========================================
 * Docs
 * ======================================== */

import $ from 'jquery';
import app from './app';
import Button from './components/Button';
import Card from './components/Card';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import DocsNavbar from './docs/DocsNavbar';

$(() => {
  new Button().init();
  new Card().init();
  new Hero().init();
  new Navbar().init();
  new DocsNavbar().init();
});
