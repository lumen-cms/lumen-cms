<template>
  <div :class="currentClass"
       v-bind="currentAttrs">
    <v-parallax v-if="!isFixedBackground"
                :height="height"
                :jumbotron="$vuetify.breakpoint.smAndDown"
                :src="src">
      <slot/>
    </v-parallax>
    <div v-else
         class="fixed-background lazyload"
         :data-bg="fixedBackgroundUrl"
         :style="fixedBackgroundStyle">
      <slot/>
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
          overflowX: 'hidden',
          height: this.parallaxHeight ? `${this.parallaxHeight}px` : `${this.height}px`
        }
      }
    },
    methods: {
      getSrc () {
        if (!this.fileReference || !process.browser) return ''
        const isSmDown = this.$vuetify.breakpoint.smAndDown
        const {vh} = getViewportDimensions()
        const h = Math.max(Math.round(vh * 1.4), this.height)
        const ref = Object.assign({}, this.fileReference, {resize: false})
        const {file} = ref
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
</style>
