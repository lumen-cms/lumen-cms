export default {
  name: 'LcCarousel',
  props: {
    height: {
      type: String,
      default: '500px'
    },
    hideBottomBar: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: null
    },
    content: {
      type: Object,
      'default': () => ({})
    }
  },
  render (h) {
    const {height, sliderShowDelimiters, sliderAutoRotation, sliderLightDesign} = this.content && this.content.properties
    const galleryItems = this.$slots.default

    const interval = sliderAutoRotation ? Number(sliderAutoRotation) : 0
    const isLight = !!sliderLightDesign
    const options = {
      props: {
        'hide-delimiters': !sliderShowDelimiters,
        cycle: !!interval,
        dark: !isLight,
        light: isLight
      },
      staticClass: this.wrapClassNames,
      style: {
        height: height ? height + 'px' : '500px'
      }
    }
    if (interval > 0) {
      options.props.interval = interval
    }
    return h('v-carousel', options, galleryItems.map(item => {
        return h('v-carousel-item', {}, [item])
      })
    )
  },
  mounted () {
    if (this.content && this.content.properties && this.content.properties.transparentToolbar) {
      this.$store.dispatch('setCmsJumbotron', true)
    }
  },
  destroyed () {
    if (this.content && this.content.properties && this.content.properties.transparentToolbar) {
      this.$store.dispatch('setCmsJumbotron', false)
    }
  },
  computed: {
    wrapClassNames () {
      let styles = (this.content && this.content.styles) || {}
      let rootClasses = (styles && styles.rootClassNames) || []
      // add specific max-width classes
      rootClasses = rootClasses.map(e => e.includes('max-width-') ? 'slider-' + e : e)
      if (styles.backgroundClassNames) {
        rootClasses = rootClasses.concat(styles.backgroundClassNames)
      }
      if (!(this.content && this.content.properties.sliderFixedBackground)) {
        rootClasses.push('center-child-elements')
      }
      if (this.content && this.content.properties.sliderZoomImages) {
        rootClasses.push('zoom-images')
      }
      return rootClasses.length ? rootClasses.join(' ') + ' carousel lc-element-slider' : 'carousel lc-element-slider'
    }
  }
}
