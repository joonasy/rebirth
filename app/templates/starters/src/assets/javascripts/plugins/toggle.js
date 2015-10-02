/* ========================================
 * Toggle (beta)
 * ======================================== */

'use strict';

import $ from 'jquery';
import Modernizr from 'modernizr';

const toggleObjects = [];

const toggle = (options) => {
  let _this = {};

  let config = $.extend({
    trigger: $(),
    triggerClass: false,
    element: $(),
    elementClass: 'is-open',
    elementStopPropagation: true,
    toggleClosest: false,
    disableFirstClickOnTouch: false,
    unToggleParentSiblings: false,
    unToggleOtherToggles: true,
    unTogglable: true,
    afterClick: function() {}
  }, options);

  _this.init = () => {
    toggleObjects.push(config);
    config.trigger.on('click', _clickTrigger);

    if (config.elementStopPropagation) {
      let $el = config.element;

      if (config.elementStopPropagation instanceof jQuery ||
          typeof config.elementStopPropagation === 'string') {
        $el = $(config.elementStopPropagation);
      }

      $el.on('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  function _clickTrigger(e) {
    const $this = $(this);

    if (config.unToggleOtherToggles) {
      _this.removeToggles(e);
    }

    const firstClick = $this.hasClass('is-firstTouch');

    if (config.disableFirstClickOnTouch && !firstClick && Modernizr.touchevents) {
      $this.addClass('is-firstTouch')
      e.preventDefault();
      setTimeout(() => {
        $this.removeClass('is-firstTouch')
      }, 1000);
    }

    if (!config.toggleClosest) {
      config.element.toggleClass(config.elementClass);
    } else {
      $this.each(() => {
        $(this)
          .closest(config.element)
          .toggleClass(config.elementClass);
      });
    }

    if (config.unToggleParentSiblings) {
      $this.each(() => {
        $(this)
          .parent()
          .siblings(config.element)
          .removeClass(config.elementClass);
      });
    }

    if (config.triggerClass) {
      $this.toggleClass(config.triggerClass);
    }

    if (!config.disableFirstClickOnTouch) {
      e.preventDefault();
    }

    config.afterClick();
    e.stopPropagation();
  };

  _this.removeToggles = (e) => {
    $.each(toggleObjects, (i, value) => {
      value.element.each(function() {
        let currentEl = $(e.currentTarget).is(value.trigger.selector);

        if (!currentEl && value.unTogglable) {
          value.element.removeClass(value.elementClass);

          if (value.triggerClass) {
            value.trigger.removeClass(value.triggerClass);
          }
        }
      });
    });
  };

  return {
    init: config.trigger.length ? _this.init() : false,
    removeToggles: _this.removeToggles
  }
};

$(window).on('click', function(e) {
  toggle().removeToggles(e);
});

export default toggle;
