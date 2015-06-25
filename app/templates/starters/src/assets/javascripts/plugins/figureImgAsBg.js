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
 *       If you need lazysizes load `require('lazysizes');` in <head>
 *
 *       In component:
 *         var figureImgAsBg = require('../plugins/figureImgAsBg');
 *         $figure = $('.My-figure', $context)
 *         figureImgAsBg($figure);
 */

'use strict';

var figureImgAsBg = function(figure) {

  var self = {};
  var $figure = $(figure);
  var shit;

  function closest(array, num) {
    var i = 0;
    var minDiff = 1000;
    var ans;
    for (i in array) {
      var m = Math.abs(num - array[i]);
      if (m < minDiff) {
        minDiff = m;
        ans = array[i];
      }
    }

    return ans;
  }

  if (!Modernizr['object-fit']) {
    $.each($figure, function() {
      var $this = $(this);
      var $img = $this.find('img');
      var srcset = $img.data('srcset');
      var imgUrl;

      if ('lazySizes' in window && srcset) {
        var srcset = srcset.split(',');
        var srcsetElements = [];
        var widths = [];

        srcset.forEach(function(value) {
          var value = value.trim();
          var width = value.split(' ').pop().replace('w', '');
          widths.push(width);
          srcsetElements.push(value);
        });

        var closestWindowWidth = closest(widths, $(window).width());

        srcsetElements.forEach(function(value, index) {
          if (value.indexOf(closestWindowWidth + 'w') > -1) {
            imgUrl = value.split(' ')[0];
          }
        });
      } else {
        imgUrl = $img.attr('data-src') ? $img.attr('data-src') :
          $img.attr('src');
      }

      $img.css('visibility', 'hidden');

      $(window).on('load', function() {
        $this.css({
          'background-image': 'url(' + imgUrl + ')'
        });
      });
    });
  }
};

module.exports = figureImgAsBg;
