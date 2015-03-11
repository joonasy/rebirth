/* ========================================
 * Hero
 * ======================================== */

var App = App || {};

App.Hero = function($) {

  var self = {},
      $hero = $('.js-Hero');

  self.init = function() {
    fixObjectFit();
  }

  self.componentFunction = function() {}

  /**
   * Fix object-fit for browsers that don't support it but support
   * background-size: cover
   */
  fixObjectFit = function() {
    if(!Modernizr['object-fit']) {
      $.each($hero, function() {
        var $this = $(this),
            $figure = $this.find('.Hero-figure', $hero),
            $img = $figure.find('img'),
            $imgUrl = $img.data('src-bg');

        $img.hide();
        $figure.css({
          'background-size': 'cover',
          'background-image': 'url('+$imgUrl+')'
        });
      });
    }

    document.addEventListener('lazybeforeunveil', function(e){
      console.log(e);
      console.log(e.srcElement.currentSrc);

    }, false);
  }

  return {
    init: self.init
  }
}(jQuery);
