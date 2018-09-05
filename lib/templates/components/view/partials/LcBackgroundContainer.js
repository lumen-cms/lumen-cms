import imageHelperMixin from '../../../mixins/imageHelperMixin'

export default {
  name: 'LcBackgroundContainer',
  mixins: [imageHelperMixin],
  props: {
    backgroundImages: Array,
    backgroundClassNames: Array
  },
  data () {
    return {
      isVisible: false
    }
  },
  render (h) {
    const backgroundImages = this.$props.backgroundImages
    const classNames = this.$props.backgroundClassNames || []
    const images = []
    const sizes = []
    const repeats = []
    const positions = []
    if (backgroundImages && backgroundImages.length) {
      backgroundImages.forEach(fileRef => {
        const attrs = this.getFileAttrs(fileRef)
        const {backgroundStyles} = fileRef

        images.push(`url("${attrs.src}")`)
        if (!backgroundStyles) return
        const size = backgroundStyles.find(e => ['cover', 'contain', 'auto'].includes(e))
        const repeat = backgroundStyles.find(e => ['repeat-x', 'repeat-y'].includes(e))
        const position = backgroundStyles.find(e => ['center', 'left', 'right'].includes(e))
        size && sizes.push(size)
        repeat && repeats.push(repeat)
        position && positions.push(position)
      })
    }
    // create single image
    let staticClass = `content-bg ${classNames.join(' ')}`
    let style = {}
    const dataBg = images && images.length && images.join(',')
    if (dataBg) {
      style = {
        'background-size': sizes.join(','),
        'background-repeat': repeats.join(','),
        'background-position': positions.join(',')
      }
      staticClass += ' lazyload'
    }
    const compenentOptions = {
      staticClass,
      style,
      attrs: {
        'data-bg': dataBg
      }
    }
    if (dataBg) {
      compenentOptions.style.backgroundImage = this.isVisible ? dataBg : ''
      compenentOptions.directives = [
        {
          name: 'observe-visibility',
          value: {
            callback: (v) => {
              v && (this.isVisible = true)
            },
            throttle: 300
          }
        }
      ]
    }
    return h('div', compenentOptions)
  }
}
