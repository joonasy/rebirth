/* ========================================
 * Set inner figure image as parent background image
 * ========================================
 *
 * Fix object-fit by setting the image as the figure background. Useful for
 * browsers that don't support object-fit but support `background-size: cover`.
 * Requires modernizr for feature detecting and lazysizes for responsive images
 * support until srcset is supported well. Doesn't support window resizing.
 *
 * http://caniuse.com/#search=object-fit
 * http://caniuse.com/#search=srcset
 * http://caniuse.com/#search=background-size
 * https://github.com/aFarkas/lazysizes
 * https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/respimg
 *
 * @usage
 *   HTML:
 *     With lazysizes:
 *       <figure class="My-figure">
 *         <img
 *           data-sizes="auto"
 *           src="..."
 *           data-srcset="
 *             ... 400w,
 *             ... 768w,
 *             ... 1200w"
 *           class="lazyload">
 *         <noscript>
 *           <img src="...">
 *         </noscript>
 *       </figure>
 *
 *       Without lazysizes:
 *         <figure class="My-figure">
 *           <img src="...">
 *         </figure>
 *
 *   JavaScript:
 *       App.figureImgAsBg('.My-figure');
 *
 *       Or recommended:
 *       $context = $('.js-context'),
 *       $figure = $('.My-figure', $context)
 *       App.figureImgAsBg($figure);
 */

var App = App || {};

(function($) {
  App.figureImgAsBg = function(figure) {

    var self = {},
        $figure = $(figure);

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

    if(!Modernizr['object-fit']) {
      $.each($figure, function() {
        var $this = $(this),
            $img = $this.find('img'),
            srcset = $img.data('srcset'),
            imgUrl;

        if(window.lazySizes && srcset) {
          var srcset = srcset.split(','),
              srcsetElements = [],
              widths = [];

          srcset.forEach(function(value) {
            var value = value.trim();
            var width = value.split(' ').pop().replace('w', '');
            widths.push(width);
            srcsetElements.push(value);
          });

          var closestWindowWidth = closest(widths, $(window).width());

          srcsetElements.forEach(function(value, index) {
            if(value.indexOf(closestWindowWidth+'w') > -1) {
              imgUrl = value.split(' ')[0];
            }
          });
        } else {
          imgUrl = $img.attr('src');
        }

        $img.css('visibility', 'hidden');

        $(window).on('load', function(){
          $this.css({
            'background-image': 'url('+imgUrl+')'
          });
        });
      });
    }
  };
}(jQuery));
