/* ========================================
 * Class toggle (beta)
 * ======================================== */

import $ from 'jquery';
import Modernizr from 'modernizr';

const classToggles = [];

function classToggle(options) {
  const config = $.extend({
    trigger: '',
    triggerClass: '',
    element: '',
    elementClass: 'is-open',
    elementStopPropagation: false,
    toggleClosest: false,
    disableFirstClickOnTouch: false,
    unToggleParentSiblings: false,
    unToggleOtherToggles: true,
    unTogglable: true,
    afterClick: () => {},
  }, options);

  const $element = $(config.element);

  const removeToggles = (currentNode) => {
    classToggles.forEach(value => {
      if (value.element && value.unTogglable) {
        const $el = $(value.element);

        $el.each(function () {
          const isToggled = $(this).hasClass(value.elementClass);
          const currentEl = $(this).is(currentNode);

          if (!currentEl && isToggled) {
            $(this).removeClass(value.elementClass);
          }
        });
      }

      if (value.triggerClass && value.unTogglable) {
        const $trigger = $(value.trigger);

        $trigger.each(function () {
          const isToggled = $(this).hasClass(value.triggerClass);
          const currentTrigger = $(this).is(currentNode);

          if (!currentTrigger && isToggled) {
            $(this).removeClass(value.triggerClass);
          }
        });
      }
    });
  };

  const clickTrigger = (e, selector) => {
    const $this = $(selector);
    const firstTouch = $this.hasClass('is-touched');

    if (config.disableFirstClickOnTouch && !firstTouch && Modernizr.touchevents) {
      $this.addClass('is-touched');
      e.preventDefault();
      setTimeout(() => {
        $this.removeClass('is-touched');
      }, 1000);
    }

    if (config.element) {
      if (config.unToggleOtherToggles) {
        removeToggles($element);
      }

      if (!config.toggleClosest) {
        $element.toggleClass(config.elementClass);
      } else {
        $this.closest($element).toggleClass(config.elementClass);
      }

      if (config.unToggleParentSiblings) {
        $this.parent().siblings($element).removeClass(config.elementClass);
      }
    }

    if (config.triggerClass) {
      if (config.unToggleOtherToggles) {
        removeToggles($this);
      }

      $this.toggleClass(config.triggerClass);
    }

    if (!config.disableFirstClickOnTouch) {
      e.preventDefault();
    }

    config.afterClick();
    e.stopPropagation();
  };

  const init = () => {
    classToggles.push(config);

    $(document).on('click', config.trigger, function (e) {
      clickTrigger(e, $(this));
    });

    if (config.elementStopPropagation) {
      let el = config.element;

      if (typeof config.elementStopPropagation === 'string') {
        el = config.elementStopPropagation;
      }

      $(document).on('click', el, e => {
        e.stopPropagation();
      });
    }
  };

  return {
    init: config.trigger.length ? init() : false,
    removeToggles,
  };
}

$(window).on('click', () => {
  classToggle().removeToggles();
});

export default classToggle;
