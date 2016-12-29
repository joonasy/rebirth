/* ========================================
 * Button
 * ======================================== */

import classToggle from '../../../javascripts/plugins/classToggle'

class Button {
  init() {
    this.dropdown()
  }

  dropdown() {
    classToggle({
      trigger: '.js-ButtonDropdown',
      triggerClass: 'is-open',
      elementStopPropagation: '.Button-dropdown',
    })
  }
}

export default Button
