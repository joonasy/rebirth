(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _feature = require("./javascripts/feature");

/* =======================================
 * App Head
 * ======================================= */
const doc = document;
const html = doc.documentElement;
html.className = html.className.replace(/(^|\s)no-js(\s|$)/, ' has-js ');

if (_feature.hasTouch) {
  html.classList.add('has-touchevents');
} else {
  html.classList.add('no-touchevents');
}

},{"./javascripts/feature":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIE = isIE;
exports.isIOS = isIOS;
exports.isAndroid = isAndroid;
exports.hasTouch = void 0;

/* =======================================
 * Features & User Agents
 * ======================================= */
const ua = navigator.userAgent;
const win = window;
const doc = document;
/**
 * Tests if touch events are supported, but doesn't necessarily reflect a
 * touchscreen device
 */

const hasTouch = !!('ontouchstart' in win || win.navigator && win.navigator.msPointerEnabled && win.MSGesture || win.DocumentTouch && doc instanceof DocumentTouch);
/**
 * Internet Explorer
 */

exports.hasTouch = hasTouch;

function isIE() {
  return !!Function('/*@cc_on return document.documentMode===10@*/')() || // eslint-disable-line
  /(?:\sTrident\/7\.0.*\srv:11\.0)/i.test(navigator.userAgent);
}
/**
 * iOS
 */


function isIOS() {
  return /iP(ad|hone|od)/i.test(navigator.userAgent);
}
/**
 * Android
 */


function isAndroid() {
  return ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;
}

},{}]},{},[1]);
