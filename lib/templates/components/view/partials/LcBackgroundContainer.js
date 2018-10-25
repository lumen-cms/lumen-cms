import imageHelperMixin from '../../../mixins/imageHelperMixin'

export default {
  name: 'LcBackgroundContainer',
  mixins: [imageHelperMixin],
  props: {
    backgroundImages: Array,
    backgroundClassNames: Array,
    isContentElementVisible: Boolean
  },
  render (h) {
    const backgroundImages = this.$props.backgroundImages
    const classNames = this.$props.backgroundClassNames || []
    const images = []
    const sizes = []
    const repeats = []
    const positions = []
    // create single image
    let staticClass = `content-bg ${classNames.join(' ')}`
    let style = {}
    if (backgroundImages && backgroundImages.length && this.isContentElementVisible) {
      backgroundImages.forEach(fileRef => {
        const attrs = this.getFileAttrs(fileRef)
        const { backgroundStyles } = fileRef
        images.push(`url("${attrs.src}")`)
        if (!backgroundStyles) return
        const size = backgroundStyles.find(e => ['cover', 'contain', 'auto'].includes(e))
        const repeat = backgroundStyles.find(e => ['repeat-x', 'repeat-y'].includes(e))
        const position = backgroundStyles.find(e => ['center', 'left', 'right'].includes(e))
        size && sizes.push(size)
        repeat && repeats.push(repeat)
        position && positions.push(position)
        style = {
          backgroundSize: sizes.join(','),
          backgroundRepeat: repeats.join(','),
          backgroundPosition: positions.join(','),
          backgroundImage: images.join(',')
        }
      })
    }
    const componentOptions = {
      staticClass,
      style
    }
    return h('div', componentOptions)
  }
}
