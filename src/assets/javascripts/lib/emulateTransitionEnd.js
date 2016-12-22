/* ========================================
 * Emulate CSS3 transition end
 * ======================================== */

import $ from 'jquery'

const emulateTransitionEnd = () => {
  function transitionSupport() { // eslint-disable-line
    const el = document.createElement('app')

    const transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend',
    }

    for (const name in transEndEventNames) { // eslint-disable-line
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  $.fn.emulateTransitionEnd = function (duration) {
    let called = false
    const $this = $(this)

    $this.one($.support.transition.end, () => {
      called = true
    })

    const callback = function () {
      if (!called) {
        $this.trigger($.support.transition.end)
      }
    }

    setTimeout(callback, duration)
    return this
  }

  $(() => {
    $.support.transition = transitionSupport()
  })
}

export default emulateTransitionEnd()
