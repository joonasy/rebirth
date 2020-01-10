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
export const hasTouch = !!(
  'ontouchstart' in win ||
  (win.navigator && win.navigator.msPointerEnabled && win.MSGesture) ||
  (win.DocumentTouch && doc instanceof DocumentTouch)
);

/**
 * Internet Explorer (11)
 */
export const isIE = () => {
  return (
    !!Function('/*@cc_on return document.documentMode===10@*/')() || // eslint-disable-line
    /(?:\sTrident\/7\.0.*\srv:11\.0)/i.test(ua)
  );
};

/**
 * Edge
 */
export const isEdge = () => /edge\//i.test(ua);

/**
 * Firefox
 */
export const isFirefox = () => 'InstallTrigger' in window;

/**
 * iOS
 */
export const isIOS = () => /iP(ad|hone|od)/i.test(ua);

/**
 * Android
 */
export const isAndroid = () =>
  ua.indexOf('Android') > -1 &&
  ua.indexOf('Mozilla/5.0') > -1 &&
  ua.indexOf('AppleWebKit') > -1;

/**
 * Mac
 */
export const isMac = () => /mac/i.test(navigator.platform);
