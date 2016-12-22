/* ========================================
 * Button
 * ======================================== */

import $ from 'jquery'
import classToggle from '../lib/classToggle'

class Button {
  init() {
    this.openButtonDropdown()
  }

  openButtonDropdown() {
    classToggle({
      trigger: '.js-Button',
      triggerClass: 'is-open',
      elementStopPropagation: '.Button-dropdown',
    })
  }
}

export default Button
