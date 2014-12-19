/* ========================================
 * Toggle
 * ======================================== */

var App = App || {};

(function($) {
  App.Toggle = function(options) {

    var self = {},
        config;

    self.config = $.extend({
      trigger: '',
      triggerClass: false,
      element: '',
      elementClass: 'is-open',
      toggleParent: false,
      disableFirstClickOnTouch: false,
      unToggleParentSiblings: false
    }, options);

    _init = function() {
      config = self.config;

      $window.on('click', _removeToggles)
      config.trigger.on('click', _click);
    }

    _click = function(e) {
      var $this = $(this);

      var firstClick = $this.hasClass('first-touch');
      var whyToDisable = $this.siblings(config.disableFirstClickOnTouch).length;

      if (config.disableFirstClickOnTouch && whyToDisable
        && !firstClick && Modernizr.touch) {
        $this.addClass('first-touch')
        e.preventDefault();

        setTimeout(function(){
          $this.removeClass('first-touch')
        }, 950);
      }

      if (config.toggleParent) {
        $this.each(function() {
          $this
            .parent(config.element)
            .toggleClass(config.elementClass);
        });
      } else {
        config.element.toggleClass(config.elementClass)
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

      if(!config.disableFirstClickOnTouch) {
        e.preventDefault();
      }

      e.stopPropagation();
    }

    _removeToggles = function() {
      self.config.element.each(function() {
        var $this = $(this);
        if (!$this.hasClass(self.config.elementClass)) return
        $this.removeClass(self.config.elementClass);
      });
    }

    return new _init()

  };
}(jQuery));