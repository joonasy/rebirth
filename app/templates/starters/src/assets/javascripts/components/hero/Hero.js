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

  /**
   * Fix CSS3 object-fit for browsers that don't support it but support
   * `background-size: cover`. Responsive images require lazysizes
   * (or similar) plugin until srcset is supported well.
   *
   * http://caniuse.com/#search=object-fit
   * http://caniuse.com/#search=srcset
   * http://caniuse.com/#search=background-size
   */
  _fixObjectFit = function() {

    if(!Modernizr['object-fit']) {

      function closest(array, num){
        var i = 0;
        var minDiff = 1000;
        var ans;

        for(i in array){
          var m = Math.abs(num-array[i]);
          if(m < minDiff){
            minDiff = m;
            ans = array[i];
          }
        }

        return ans;
      }

      var setupBgImg = function(e) {

        $.each($hero, function() {
          var $this = $(this),
              $figure = $this.find('.Hero-figure', $hero),
              $img = $figure.find('img');

          var srcset = $img.data('srcset'),
              srcset = srcset.split(','),
              srcSetElements = [],
              widths = [],
              imgUrl;

          srcset.forEach(function(value) {
            var value = value.trim();
            var width = value.split(' ').pop().replace('w', '');
            widths.push(width);
            srcSetElements.push(value);
          });

          var closestWindowWidth = closest(widths, $(window).width());

          srcSetElements.forEach(function(value, index) {
            if(value.indexOf(closestWindowWidth+'w') > -1) {
              imgUrl = value.split(' ')[0];
            }
          });

          $img.hide();
          $figure.css({
            'background-image': 'url('+imgUrl+')'
          });
        });
      }();
    }
  }

  return {
    init: self.init
  }
}(jQuery);
