(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function() {
        return root.svg4everybody = factory();
    }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for (// clone the target
            var clone = target.cloneNode(!0); clone.childNodes.length; ) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }
    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
            // if the request is ready
            if (4 === xhr.readyState) {
                // get the cached html document
                var cachedDocument = xhr._cachedDocument;
                // ensure the cached html document based on the xhr response
                cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), 
                cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                xhr._embeds.splice(0).map(function(item) {
                    // get the cached target
                    var target = xhr._cachedTarget[item.id];
                    // ensure the cached target
                    target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), 
                    // embed the target into the svg
                    embed(item.parent, item.svg, target);
                });
            }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
    }
    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for (// get the cached <use> index
            var index = 0; index < uses.length; ) {
                // get the current <use>
                var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), 
                svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), 
                                xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                xhr._embeds.push({
                                    parent: parent,
                                    svg: svg,
                                    id: id
                                }), // prepare the xhr ready state change event
                                loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }
    function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {}
        return svg;
    }
    return svg4everybody;
});
},{}],2:[function(require,module,exports){
"use strict";

require("./javascripts/polyfill");

var _svg4everybody = _interopRequireDefault(require("svg4everybody"));

var _detect = require("./javascripts/detect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* =======================================
 * Head
 * ======================================= */
var doc = document;
var html = doc.documentElement;
html.className = html.className.replace(/(^|\s)no-js(\s|$)/, ' has-js ');

if (_detect.hasTouch) {
  html.classList.add('has-touchevents');
} else {
  html.classList.add('no-touchevents');
}

(0, _svg4everybody.default)();

},{"./javascripts/detect":3,"./javascripts/polyfill":4,"svg4everybody":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollBarWidth = exports.hasObjectFit = exports.hasDialog = exports.isMac = exports.isAndroid = exports.isIOS = exports.isFirefox = exports.isEdge = exports.isIE = exports.hasTouch = void 0;

/* =======================================
 * Detects, Features & User Agents
 * ======================================= */
var ua = navigator.userAgent;
var win = window;
var doc = document;
var html = doc.documentElement;
/**
 * Tests if touch events are supported, but doesn't necessarily reflect a
 * touchscreen device
 */

var hasTouch = !!('ontouchstart' in win || win.navigator && win.navigator.msPointerEnabled && win.MSGesture || win.DocumentTouch && doc instanceof DocumentTouch);
/**
 * Internet Explorer (11)
 */

exports.hasTouch = hasTouch;
var isIE = window.document.documentMode;
/**
 * Edge
 */

exports.isIE = isIE;
var isEdge = /edge\//i.test(ua);
/**
 * Firefox
 */

exports.isEdge = isEdge;
var isFirefox = ('InstallTrigger' in window);
/**
 * iOS
 */

exports.isFirefox = isFirefox;
var isIOS = /iP(ad|hone|od)/i.test(ua);
/**
 * Android
 */

exports.isIOS = isIOS;
var isAndroid = ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('AppleWebKit') > -1;
/**
 * Mac
 */

exports.isAndroid = isAndroid;
var isMac = /mac/i.test(navigator.platform);
/**
 * Dialog
 */

exports.isMac = isMac;
var hasDialog = ('show' in document.createElement('dialog'));
/**
 * Object fit
 */

exports.hasDialog = hasDialog;
var hasObjectFit = 'objectFit' in html.style !== false;
/**
 * Detect scrollbar width
 */

exports.hasObjectFit = hasObjectFit;

var getScrollBarWidth = function getScrollBarWidth() {
  var scrollDiv = document.createElement('div');
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-999px';
  scrollDiv.style.width = '100px';
  html.appendChild(scrollDiv);
  var scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  html.removeChild(scrollDiv);
  return scrollBarWidth;
};

var scrollBarWidth = getScrollBarWidth();
exports.scrollBarWidth = scrollBarWidth;

},{}],4:[function(require,module,exports){
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

},{}]},{},[2]);
