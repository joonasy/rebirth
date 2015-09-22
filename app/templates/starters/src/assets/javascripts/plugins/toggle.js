/* ========================================
 * Toggle (beta)
 * ======================================== */

'use strict';

import $ from 'jquery';
import Modernizr from 'modernizr';

const toggleObjects = [];

const toggle = (options) => {
  var config;
  var self = {};

  config = $.extend({
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

  self.init = () => {
    toggleObjects.push(config);
    config.trigger.on('click', _clickTrigger);

    if (config.elementStopPropagation) {
      let elToDisable = config.element;

      if (config.elementStopPropagation instanceof jQuery ||
          typeof config.elementStopPropagation === 'string') {
        elToDisable = $(config.elementStopPropagation);
      }

      elToDisable.on('click', function(e) {
        e.stopPropagation();
      });
    }
  }

  const _clickTrigger = function(e) {
    const $this = $(this);
    let isToggled;

    if (config.unToggleOtherToggles) {

      if (config.toggleClosest) {
        isToggled = !$this.closest(config.element).hasClass(config.elementClass);
      } else if (!config.toggleClosest) {
        isToggled = !config.element.hasClass(config.elementClass);
      }

      if (isToggled) {
        self.removeToggles();
      }
    }

    const firstClick = $this.hasClass('is-firstTouch');

    if (config.disableFirstClickOnTouch && !firstClick && Modernizr.touchevents) {
      $this.addClass('is-firstTouch')
      e.preventDefault();
      setTimeout(() => {
        $this.removeClass('is-firstTouch')
      }, 1000);
    }

    if (config.toggleClosest) {
      $this.each(function() {
        $this
          .closest(config.element)
          .toggleClass(config.elementClass);
      });
    } else {
      config.element.toggleClass(config.elementClass);
    }

    if (config.unToggleParentSiblings) {
      $this.each(function() {
        $this
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

  self.removeToggles = () => {
    $.each(toggleObjects, function(index, value) {
      value.element.each(function() {
        if (!$(this).hasClass(value.elementClass) || !value.unTogglable) {
          return
        }

        $(this).removeClass(value.elementClass);
      });

      if (value.triggerClass) {
        value.trigger.removeClass(value.triggerClass);
      }
    });
  };

  return {
    init: config.trigger.length ? self.init() : false,
    removeToggles: self.removeToggles
  }
};

$(window).on('click', function(e) {
  toggle().removeToggles();
});

export default toggle;
