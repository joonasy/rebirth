/* =======================================
 * Head
 * ======================================= */

import './javascripts/polyfill';
import svg4everybody from 'svg4everybody';
import { hasTouch } from './javascripts/detect';

const doc = document;
const html = doc.documentElement;

html.className = html.className.replace(/(^|\s)no-js(\s|$)/, ' has-js ');

if (hasTouch) {
  html.classList.add('has-touchevents');
} else {
  html.classList.add('no-touchevents');
}

/**
 * Polyfill external SVG spritemaps
 */
svg4everybody();
