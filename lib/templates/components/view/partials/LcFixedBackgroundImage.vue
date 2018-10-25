<template>
  <div :class="currentClass">
    <lc-image :height="height"
              :class="{'lc-fixed-bg-img':isFixed,'lc-zoom-enabled':zoomEnabled}"
              :src="src"
              :is-visible="isContentElementVisible">
      <v-container fill-height fluid>
        <v-layout :align-center="!alignEnd" :align-end="alignEnd">
          <v-flex text-xs-center>
            <v-layout column style="position: relative">
              <slot/>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </lc-image>
  </div>
</template>
<script>
  import LcImage from './LcImage'
  import parallaxMixin from '../../../mixins/parallaxMixin'
  import imageSrcMixin from '../../../mixins/imageHelperMixin'
  import imgSrcsetMixin from '../../../mixins/getImageSourceSet'

  export default {
    name: 'LcFixedBackgroundImage',
    mixins: [parallaxMixin, imageSrcMixin, imgSrcsetMixin],
    props: {
      zoomEnabled: {
        type: Boolean
      },
      alignEnd: {
        type: Boolean,
        default: false
      }
    },
    components: { LcImage },
    computed: {
      isFixed () {
        if (process.browser) {
          const userAgent = window.navigator.userAgent
          if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            // iPad or iPhone
            return false
          }
        }
        return true
      },
      src () {
        if (!this.fileReference || !this.fileReference.file) return ''
        const ref = Object.assign({}, this.fileReference)
        ref.resize = ref.resize || 'x' + this.height // not sure if we should do any resizing actually
        const file = this.fileReference.file
        // const {xCropAmount, yCropAmount} = this.getJumbotronCropValue(this.height, file.height, file.width)
        // const {src} = this.getImageSrc(file, null, `${xCropAmount}x${yCropAmount}centro`)
        // todo we should work out some srcset in the future
        const { src } = this.getImageSrc(file, null)
        return src
      }
    }
  }
</script>
<style lang="stylus">
  .v-image.lc-fixed-bg-img {
    .v-image__image {
      background-attachment: fixed
    }
  }

  .v-image.lc-zoom-enabled {
    .v-image__image {
      animation: zoomin 20s ease-in infinite;
      transition: all .5s ease-in-out;
    }
  }
</style>
