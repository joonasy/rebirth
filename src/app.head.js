/* =======================================
 * App Head
 * ======================================= */

import { hasTouch } from './javascripts/feature';

const doc = document;
const html = doc.documentElement;

html.className = html.className.replace(/(^|\s)no-js(\s|$)/, ' has-js ');

if (hasTouch) {
  html.classList.add('has-touchevents');
} else {
  html.classList.add('no-touchevents');
}
