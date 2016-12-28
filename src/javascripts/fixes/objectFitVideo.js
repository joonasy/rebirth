/* ========================================
 * Fix object fit video
 * ======================================== */

import $ from 'jquery'
import Modernizr from 'modernizr'

const objFit = Modernizr['object-fit']
let windowWidth = $(window).width()
let windowHeight = $(window).height()
let videoWidth
let videoHeight

const fixObjectFitVideo = (video) => {
  function fitVideo() {
    const $video = $(video)

    $video.each(function () {
      const $this = $(this)
      const videoAspectRatio = $this.height() / $this.width()
      const windowAspectRatio = windowHeight / windowWidth

      if (videoAspectRatio > windowAspectRatio) {
        videoWidth = windowWidth
        videoHeight = videoWidth * videoAspectRatio
        $this.css({
          top: `${-(videoHeight - windowHeight) / 2}px`,
          marginLeft: 0,
        })
      } else {
        videoHeight = windowHeight
        videoWidth = videoHeight / videoAspectRatio
        $this.css({
          marginTop: 0,
          marginLeft: `${-(videoWidth - windowWidth) / 2}px`,
        })
      }

      $this.width(videoWidth).height(videoHeight)
    })
  }

  if (!objFit) {
    fitVideo()

    let resize
    $(window).on('resize', () => {
      windowWidth = $(window).width()
      windowHeight = $(window).height()
      clearTimeout(resize)
      resize = setTimeout(fitVideo, 250)
    })
  }
}

export default fixObjectFitVideo
