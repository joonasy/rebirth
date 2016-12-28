/* ========================================
 * Button
 * ======================================== */

import classToggle from '../../../javascripts/plugins/classToggle'

class ButtonDropdown {
  init() {
    this.toggle()
  }

  toggle() {
    classToggle({
      trigger: '.js-ButtonDropdown',
      triggerClass: 'is-open',
      elementStopPropagation: '.Button-dropdown',
    })
  }
}

export default ButtonDropdown
