/* ========================================
 * Features & User Agents
 * ======================================== */

const ua = navigator.userAgent;
const win = window;
const doc = document;

/**
 * Tests if touch events are supported, but doesn't necessarily reflect a touchscreen device
 */
export const hasTouch = !!(
  'ontouchstart' in win ||
  (win.navigator && win.navigator.msPointerEnabled && win.MSGesture) ||
  (win.DocumentTouch && doc instanceof DocumentTouch)
);

/**
 * Internet Explorer
 */
export function isIE() {
  return (
    !!Function('/*@cc_on return document.documentMode===10@*/')() || // eslint-disable-line
    /(?:\sTrident\/7\.0.*\srv:11\.0)/i.test(navigator.userAgent)
  );
}

/**
 * iOS
 */
export function isIOS() {
  return /iP(ad|hone|od)/i.test(navigator.userAgent);
}

/**
 * Android
 */
export function isAndroid() {
  return (
    ua.indexOf('Android') > -1 &&
    ua.indexOf('Mozilla/5.0') > -1 &&
    ua.indexOf('AppleWebKit') > -1
  );
}
