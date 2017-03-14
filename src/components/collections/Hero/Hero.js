/* ========================================
 * Hero
 * ======================================== */

import $ from 'jquery'
import fixObjectFitImage from '../../../javascripts/fixes/objectFitImage'
import fixObjectFitVideo from '../../../javascripts/fixes/objectFitVideo'
import * as ua from '../../../javascripts/utils/userAgents'
import cfg from '../../../config'

class Hero {
  constructor() {
    this.$hero = $('.js-Hero')
    this.$figure = $('.Hero-figure', this.$hero)
    this.$figureVideo = $('.Hero-figure--video', this.$hero)
    this.$fullContent = $('.Hero-content', '.js-Hero.-full')
  }

  init() {
    this.fixes()
    this.heroVideo()
  }

  fixes() {
    fixObjectFitVideo(this.$figureVideo)

    $.each(this.$figure, function () {
      const $this = $(this)
      const hasObjPos = $this.parent().is('[class*="-alignFigure"]')
      fixObjectFitImage($this, hasObjPos, hasObjPos)
    })

    /**
     * Fix to prevent android from changing the height of the hero content item
     * on touch scroll.
     */
    if (ua.isAndroid()) {
      const minHeight = () => {
        $.each(this.$fullContent, function () {
          const $this = $(this)
          $this.css('min-height', '').css('min-height', $this.outerHeight())
        })
      }
      minHeight()
      cfg.dom.$window.on('orientationchange', minHeight)
    }

    /**
     * Fix to set correct viewport height to first hero content items.
     * Tabs etc. in safari are not part of the viewport
     */
    if (ua.isIOS()) {
      const minHeight = () => {
        $.each(this.$fullContent, function () {
          const $this = $(this)
          $this.css('min-height', cfg.dom.$window.height())
        })
      }
      minHeight()
      cfg.dom.$window.on('orientationchange', minHeight)
    }
  }

  /**
   * Set video on top of the hero image if autoplay is possible. We are using the poster
   * figure as responsive poster for the video.
   */
  heroVideo() {
    $.each(this.$figureVideo, function () {
      const $this = $(this)
      const video = $this.find('video').get(0)

      if (video) {
        video.play()

        if (!video.paused) {
          $this.css({ zIndex: 1 })
        }
      }
    })
  }
}

export default Hero
