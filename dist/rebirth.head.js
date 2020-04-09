(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

require("./javascripts/polyfill");

var _feature = require("./javascripts/feature");

/* =======================================
 * Head
 * ======================================= */
var doc = document;
var html = doc.documentElement;
html.className = html.className.replace(/(^|\s)no-js(\s|$)/, ' has-js ');

if (_feature.hasTouch) {
  html.classList.add('has-touchevents');
} else {
  html.classList.add('no-touchevents');
}

},{"./javascripts/feature":2,"./javascripts/polyfill":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isMac = exports.isAndroid = exports.isIOS = exports.isFirefox = exports.isEdge = exports.isIE = exports.hasTouch = void 0;

/* =======================================
 * Features & User Agents
 * ======================================= */
var ua = navigator.userAgent;
var win = window;
var doc = document;
/**
 * Tests if touch events are supported, but doesn't necessarily reflect a
 * touchscreen device
 */

var hasTouch = !!('ontouchstart' in win || win.navigator && win.navigator.msPointerEnabled && win.MSGesture || win.DocumentTouch && doc instanceof DocumentTouch);
/**
 * Internet Explorer (11)
 */

exports.hasTouch = hasTouch;

var isIE = function isIE() {
  return !!Function('/*@cc_on return document.documentMode===10@*/')() || // eslint-disable-line
  /(?:\sTrident\/7\.0.*\srv:11\.0)/i.test(ua);
};
/**
 * Edge
 */


exports.isIE = isIE;

var isEdge = function isEdge() {
  return /edge\//i.test(ua);
};
/**
 * Firefox
 */


exports.isEdge = isEdge;

var isFirefox = function isFirefox() {
  return 'InstallTrigger' in window;
};
/**
 * iOS
 */


exports.isFirefox = isFirefox;

var isIOS = function isIOS() {
  return /iP(ad|hone|od)/i.test(ua);
};
/**
 * Android
 */


exports.isIOS = isIOS;

var isAndroid = function isAndroid() {
  return ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;
};
/**
 * Mac
 */


exports.isAndroid = isAndroid;

var isMac = function isMac() {
  return /mac/i.test(navigator.platform);
};

exports.isMac = isMac;

},{}],3:[function(require,module,exports){
"use strict";

/* =======================================
 * Polyfill
 * ======================================= */

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
 */


if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

},{}]},{},[1]);
