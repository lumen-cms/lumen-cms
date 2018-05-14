<template>
  <div :class="currentClass"
       v-bind="currentAttrs"
       v-if="src">
    <v-parallax v-if="currentAttrs && height && !isFixedBackground"
                class="lazyload"
                alt="parallax-image"
                :height="height"
                :jumbotron="$vuetify.breakpoint.smAndDown"
                :src="browserSniffer().isChrome ? '': src"
                :data-prx="src">
      <slot/>
    </v-parallax>
    <div v-else
         class="fixed-background"
         :style="fixedBackgroundStyle">
      <div class="bg-image lazyload"
           :data-bg="fixedBackgroundUrl"
           :style="fixedBackgroundStyle"/>
      <div class="fixed-background__content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  import getViewportDimensions from '../../../util/getViewportDimensions'
  import getJumbotronCropValue from '../../../util/getJumbotronCropValue'
  import {getImageSrc} from '../../../util/imageSrcHelper'

  /**
   * @description parallax of vuetify superset with static background
   * IMPORTANT :src must be set otherwise Firefox does not correctly apply transition
   */
  export default {
    name: 'ContentTextParallax',
    // @TODO - properly declare props
    props: {
      'content': {
        type: Object
      },
      isFixedBackground: {
        type: Boolean
      },
      parallaxHeight: {
        type: Number | String
      },
      languageKey: {
        type: String
      },
      isFirstOfPage: {
        type: Boolean
      },
      currentClass: {
        type: String | Object
      },
      currentAttrs: {
        type: Object
      }
    },
    data () {
      return {
        src: ''
      }
    },
    mounted () {
      if (this.isFirstOfPage) {
        this.$store.dispatch('setCmsJumbotron', true)
      }
      this.src = this.getSrc()
    },
    destroyed () {
      if (this.isFirstOfPage) {
        this.$store.dispatch('setCmsJumbotron', false)
      }
    },
    computed: {
      fileReference () {
        const refs = this.content.fileReferences || []
        return Object.assign({}, refs.length && refs[0])
      },
      height () {
        if (!this.fileReference) return 300
        const {vh} = getViewportDimensions()
        if (this.fileReference.resize) {
          return Math.min(vh, Number(this.fileReference.resize.replace(/\D/g, '')))
        } else {
          return this.parallaxHeight || 300
        }
      },
      fixedBackgroundUrl () {
        if (!this.isFixedBackground || !this.fileReference) return
        return 'url(' + this.getSrc() + ')'
      },
      fixedBackgroundStyle () {
        if (!this.isFixedBackground || !this.fileReference) return
        // const ref = Object.assign({}, this.fileReference, {resize: false})
        let backgroundAttachment = 'fixed'
        if (process.browser) {
          const userAgent = window.navigator.userAgent
          if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            // iPad or iPhone
            backgroundAttachment = 'scroll'
          }
        }
        return {
          backgroundAttachment,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          position: 'relative',
          overflow: 'hidden',
          height: this.parallaxHeight ? `${this.parallaxHeight}px` : `${this.height}px`
        }
      }
    },
    methods: {
      browserSniffer () {
        // https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
        // Opera 8.0+
        const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

        // Firefox 1.0+
        const isFirefox = typeof InstallTrigger !== 'undefined'

        // Safari 3.0+ "[object HTMLElementConstructor]"
        const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
          return p.toString() === '[object SafariRemoteNotification]'
        })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))

        // Internet Explorer 6-11
        const isIE = /*@cc_on!@*/false || !!document.documentMode

        // Edge 20+
        const isEdge = !isIE && !!window.StyleMedia

        // Chrome 1+
        const isChrome = !!window.chrome && !!window.chrome.webstore

        // Blink engine detection
        const isBlink = (isChrome || isOpera) && !!window.CSS
        return {isOpera, isFirefox, isSafari, isIE, isEdge, isChrome, isBlink}
      },
      getSrc () {
        if (!this.fileReference || !process.browser) return ''
        const isSmDown = this.$vuetify.breakpoint.smAndDown
        const {vh} = getViewportDimensions()
        const h = Math.max(Math.round(vh * 1.4), this.height)
        const ref = Object.assign({}, this.fileReference, {resize: false})
        const {file} = ref
        if (!file) return ''
        const {xCropAmount, yCropAmount} = getJumbotronCropValue(this.height, file.height, file.width)

        return getImageSrc(ref.file,
          false,
          isSmDown
            // Jumbotron crop
            ? `${xCropAmount}x${yCropAmount}centro`
            // Parallax crop
            : `${xCropAmount}x${Math.min(file.height, h)}centro`
        ).src
      }
    }
  }
</script>

<style lang="stylus">
  [jumbotron="true"] {
    img {
      transform: none !important;
      left: 0;
      top: 0;
    }
  }

  .fixed-background .fixed-background__content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0
  }

  .zoom-enabled {
    .fixed-background .bg-image {
      animation: zoomin 20s ease-in infinite;
      transition: all .5s ease-in-out;
    }
  }
</style>
