<template>
  <div :class="currentClass"
       v-bind="currentAttrs"
       v-if="src">
    <div class="fixed-background"
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
  import parallaxMixin from '../../../mixins/parallaxMixin'
  import parallaxFixedBgMixin from '../../../mixins/parallaxFixedBgMixing'

  /**
   * @description parallax of vuetify superset with static background
   * IMPORTANT :src must be set otherwise Firefox does not correctly apply transition
   */
  export default {
    name: 'LcFixedBackgroundParallax',
    mixins: [parallaxMixin, parallaxFixedBgMixin],
    props: {
      defaultHeight: {
        type: Number,
        default: 300
      }
    },
    computed: {
      fixedBackgroundUrl () {
        if (!this.src) return
        return 'url(' + this.src + ')'
      },
      fixedBackgroundStyle () {
        if (!this.src) return
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
    }
  }
</script>

<style lang="stylus">
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
