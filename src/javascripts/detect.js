/* =======================================
 * Detects, Features & User Agents
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
export const isIE = window.document.documentMode;

/**
 * Edge
 */
export const isEdge = /edge\//i.test(ua);

/**
 * Firefox
 */
export const isFirefox = 'InstallTrigger' in window;

/**
 * iOS
 */
export const isIOS = /iP(ad|hone|od)/i.test(ua);

/**
 * Android
 */
export const isAndroid =
  ua.indexOf('Android') > -1 &&
  ua.indexOf('Mozilla/5.0') > -1 &&
  ua.indexOf('AppleWebKit') > -1;

/**
 * Mac
 */
export const isMac = /mac/i.test(navigator.platform);

/**
 * Dialog
 */
export const hasDialog = 'show' in document.createElement('dialog');

/**
 * Detect scrollbar width
 */
const getScrollBarWidth = () => {
  /**
   * Create the measurement node
   */
  const scrollDiv = document.createElement('div');
  scrollDiv.style.width = '100px';
  scrollDiv.style.height = '100px';
  scrollDiv.style.overflow = 'scroll';
  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-999px';

  document.documentElement.appendChild(scrollDiv);

  /**
   * Get the scrollbar width
   */
  const scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

  /**
   * Delete the node
   */
  document.documentElement.removeChild(scrollDiv);

  return scrollBarWidth;
};

export const scrollBarWidth = getScrollBarWidth();
