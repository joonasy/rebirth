/* ========================================
 * Application
 * ======================================== */

import $ from 'jquery'
import fastClick from 'fastclick'
import Component from './components/Component'

window.jQuery = window.$ = $

new Component().init()
fastClick(document.body)
