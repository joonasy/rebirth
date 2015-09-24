/* ========================================
 * Inner image as parent background image
 * ========================================
 *
 * Fix object-fit by setting the image as the parent figure background. Targeted
 * for browsers that don't support object-fit but support `background-size: cover`.
 * Remember to add `background-size: cover` to the parent element
 * (usually <figure>).
 *
 * Requires jQuery, Modernizr for feature detecting and Lazysizes for responsive
 * images support until srcset/picture is supported well in all browsers.
 * Doesn't support window resizing.
 *
 * Only single line strings supported in `data-srcset` and `media`.
 *
 * http://caniuse.com/#search=object-fit
 * http://caniuse.com/#search=srcset
 * http://caniuse.com/#search=background-size
 * https://github.com/aFarkas/lazysizes
 * https://github.com/aFarkas/lazysizes/tree/gh-pages/plugins/respimg
 *
 * @usage
 *  With lazysizes and srcset:
 *    <figure class="My-figure">
 *      <img
 *        data-sizes="auto"
 *        src="smallest.jpg"
 *        data-srcset="
 *          ... 400w,
 *          ... 768w,
 *          ... 1200w"
 *          class="lazyload">
 *      <noscript>
 *        <img src="smallest.jpg">
 *      </noscript>
 *    </figure>
 *
 *  With lazysizes, <picture> and srcset:
 *    <figure class="My-figure">
 *      <picture>
 *        <source srcset="smallest.jpg" media="(max-width: 600px)" />
 *        <source srcset="..." media="(max-width: 1000px)" />
 *        <source srcset="largest.jpg" />
 *        <img src="smallest.jpg" class="lazyload" />
 *      </picture>
 *    </figure>
 *
 *  With lazysizes:
 *    <figure class="My-figure">
 *      <img data-src="...">
 *      <noscript>
 *        <img src="...">
 *      </noscript>
 *    </figure>
 *
 *  Without lazysizes:
 *    <figure class="My-figure">
 *      <img src="...">
 *    </figure>
 *
 *  JavaScript:
 *    If you need lazysizes load `require('lazysizes');` in <head>
 *    And in case you need responsive images add
 *    require('lazysizes/plugins/respimg/ls.respimg.js'); to <head> also
 *
 *    In component:
 *      const $context = $('.js-MyComponent');
 *      const figureImgAsBg = require('../plugins/figureImgAsBg');
 *      $figure = $('.My-figure', $context)
 *      figureImgAsBg($figure);
 */

'use strict';

import $ from 'jquery';
import Modernizr from 'modernizr';

const windowWidth = $(window).width();

let isSafari = /Constructor/.test(window.HTMLElement);
let isIOS = /iP(ad|hone|od)/i.test(navigator.userAgent);

/**
 * @param { jquerySelector|string } figure - Node to search
 * @param { boolean } targetSafari - target Safari [1.]
 * @param { boolean } targetIOS - target iOS [1.]
 *
 * [1.] Safari and iOS doesn't support object-position
 */
const imgToParentBg = (figure, targetSafari, targetIOS) => {
  isSafari = isSafari && targetSafari;
  isIOS = isIOS && targetIOS;

  const $figure = $(figure);

  let imgUrl;

  function closest(array, num) {
    let i = 0;
    let minDiff = 1000;
    let ans;

    for (i in array) {
      const m = Math.abs(num - array[i]);
      if (m < minDiff) {
        minDiff = m;
        ans = array[i];
      }
    }

    return ans;
  }

  if (isSafari || isIOS || Modernizr['object-fit']) {
    $.each($figure, function() {
      const $this = $(this);
      const $img = $this.find('img');
      const sourceLargest = $img.siblings('source').not('[media]');
      const source = $img.siblings('source[media]');
      const widths = [];

      let srcset = $img.data('srcset');

      if ('lazySizes' in window && srcset) {
        srcset = srcset.split(',');
        const srcsetElements = [];

        srcset.forEach((value) => {
          let val = value.trim();
          const width = val.split(' ').pop().replace('w', '');
          widths.push(width);
          srcsetElements.push(val);
        });

        const closestWindowWidth = closest(widths, windowWidth);

        srcsetElements.forEach((value) => {
          if (value.indexOf(closestWindowWidth + 'w') > -1) {
            imgUrl = value.split(' ')[0];
          }
        });
      } else if ('lazySizes' in window && source.length) {

        function matchNumber(str) {
          return str.match(/(\d+)/)[0]
        }

        $.each(source, function() {
          const media = $(this).attr('media');
          widths.push(matchNumber(media));
        });

        const closestWindowWidth = closest(widths, windowWidth);
        const largestMaxWidth = Math.max.apply(Math, widths);

        if (largestMaxWidth > windowWidth) {
          $.each(source, function() {
            const $this = $(this);
            const media = matchNumber($this.attr('media'));

            if (media === closestWindowWidth) {
              imgUrl = $this.attr('srcset').split(' ').pop();
            }
          });
        } else {
          imgUrl = sourceLargest.attr('srcset');
        }
      } else {
        imgUrl = $img.attr('data-src') ? $img.attr('data-src') :
          $img.attr('src');
      }

      $img.css('visibility', 'hidden');

      $this.css({
        'background-image': 'url(' + imgUrl + ')'
      });
    });
  }
};

export default imgToParentBg;
