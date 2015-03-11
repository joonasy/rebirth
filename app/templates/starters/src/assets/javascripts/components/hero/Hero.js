/* ========================================
 * Hero
 * ======================================== */

var App = App || {};

App.Hero = function($) {

  var self = {},
      $hero = $('.js-Hero'),
      $heroFigure = $('.Hero-figure', $hero);

  self.init = function() {
    _fixObjectFit();
  }

  self.componentFunction = function() {}

  /**
   * Fix CSS3 object-fit for browsers that don't support it but support
   * `background-size: cover`. Responsive images require lazysizes
   * (or similar) plugin until srcset is supported well.
   */
  _fixObjectFit = function() {

    if(Modernizr['object-fit']) {

      var setupBgImg = function(e) {
        $(e.target).on('load', function(){

          if($(e.target).parent().is($heroFigure)) {
            var $targetImg = $(e.target), // .Hero-figure img
                $parent = $targetImg.parent(); // .Hero-figure

            $targetImg.hide();
            $parent.css({
              'background-size': 'cover',
              'background-image': 'url('+e.target.currentSrc+')'
            });
          }
        });
      }

      $(document).on('lazybeforeunveil', setupBgImg);
    }
  }

  return {
    init: self.init
  }
}(jQuery);
