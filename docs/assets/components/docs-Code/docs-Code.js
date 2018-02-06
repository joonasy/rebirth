/* =======================================
 * Code
 * ======================================= */

import { $, $$ } from 'javascripts/utility';
import hljs from 'highlight.js';

export default class Code {
  constructor() {
    hljs.initHighlightingOnLoad();
  }
}
