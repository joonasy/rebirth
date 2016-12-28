/* ========================================
 * Window
 * ======================================== */

import $ from 'jquery'

const $window = $(window)

export function windowWidth() {
  let wW = $window.width()

  $window.on('resize', () => {
    wW = $window.width()
  })

  return wW
}

export function windowHeight() {
  let wH = $window.height()

  $window.on('resize', () => {
    wH = $window.height()
  })

  return wH
}

export function windowScrollPosition() {
  let scrollPos = $window.scrollTop()

  $window.on('scroll', () => {
    scrollPos = $window.scrollTop()
  })

  return scrollPos
}
