import LcImageCards from './LcImageCards'
import LcImageCarousel from './LcImageCarousel'

export default {
  name: 'LcImageGallery',
  props: {
    content: Object,
    isContentElementVisible: Boolean
  },
  render (h) {
    const props = this.$props
    const { content } = props
    const { imageColumnSize } = content.properties
    const hasImageColSize = imageColumnSize && (imageColumnSize.includes('Size_') || imageColumnSize === 'variable')

    if (hasImageColSize) {
      // render image gallery as grid cards
      return h(LcImageCards, { props: { content, isContentElementVisible: this.isContentElementVisible } })
    }
    // render image gallery as carousel
    return h(LcImageCarousel, { props: { content, isContentElementVisible: this.isContentElementVisible } })
  }
}
