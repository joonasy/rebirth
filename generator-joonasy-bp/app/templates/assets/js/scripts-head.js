var ua = navigator.userAgent,
    doc = document,
    docEl = doc.documentElement;

/**
 * A fix is on the way to get Windows Phone 8 to recognize
 * CSS pixels rather than device pixels (which is preferred behavior).
 * In the meantime, use this javascript before any other script
 * if you need an immediate patch:
 * http://trentwalton.com/2013/01/16/windows-phone-8-viewport-fix/
 */
if (ua.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = doc.createElement('style');
  msViewportStyle.appendChild(doc.createTextNode('@-ms-viewport{width:auto!important}'));
  doc.getElementsByTagName('head')[0].appendChild(msViewportStyle);
}

/**
 * Detect mobile "font-face" support
 *
 * Doesn't check support on desktop browsers
 * so you should use Modernizr in combination with this
 * UA detection to get the most out of it.
 */
var isMobileFontfaceSupported = (function () {
  if (ua.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Nokia)|(Opera Mini)|(w(eb)?OSBrowser)|(webOS)|(UCWEB)|(Windows Phone OS 7)|(XBLWP7)|(ZuneWP7)/)) {
    return false;
  }
  return true;
})();
if (!isMobileFontfaceSupported) {
  docEl.className += ' no-fontface ';
  // If used together with modernizr font-face detection:
  // docEl.className = docEl.className.replace(/(^|\s)fontface(\s|$)/, ' no-fontface ');
}