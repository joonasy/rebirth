/* ========================================
 * User agents
 * ======================================== */

const ua = navigator.userAgent

export function isIE() {
  return !!(Function('/*@cc_on return document.documentMode===10@*/')()) // eslint-disable-line
      || /(?:\sTrident\/7\.0.*\srv:11\.0)/i.test(navigator.userAgent)
}

export function isIOS() {
  return /iP(ad|hone|od)/i.test(navigator.userAgent)
}

export function isAndroid() {
  return ua.indexOf('Android') > -1 && ua.indexOf('Mozilla/5.0') > -1
      && ua.indexOf('AppleWebKit') > -1
}
