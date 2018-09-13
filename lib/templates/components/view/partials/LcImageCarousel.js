import LcImageCardsItem from './LcImageCardsItem'
import imageCardMixin from '../../../mixins/imageCardMixin'

export default {
  name: 'LcImageCarousel',
  mixins: [imageCardMixin],
  props: {
    content: Object,
    isContentElementVisible: Boolean
  },
  render (h) {
    const {activateLightBox, fileReferences} = this.content
    const {slideshowHeight, slideshowHideDelimiters, slideshowAutoRotation} = this.content.properties
    const classNames = this.content.styles.rootClassNames || []
    const styleType = this.getImageStyleOptions(classNames)

    // image carousel
    const interval = slideshowAutoRotation ? Number(slideshowAutoRotation) : 0
    const isLight = styleType.cardTheme && styleType.cardTheme === 'light'
    const carouselOpts = {
      props: {
        dark: !isLight,
        light: isLight,
        'hide-delimiters': !!slideshowHideDelimiters,
        cycle: !!interval
      },
      style: {
        height: slideshowHeight ? slideshowHeight + 'px' : '400px'
      }
    }
    if (interval > 0) {
      carouselOpts.props.interval = interval
    }
    return h(
      'v-carousel',
      carouselOpts,
      fileReferences.map((fileRef, i) => {
        if (!fileRef.file) return
        return h('v-carousel-item', {}, [
          h(LcImageCardsItem, {
            props: {
              fileRef,
              index: i,
              // size: false,
              activateLightBox,
              styleType,
              slideshowHeight,
              isContentElementVisible: this.isContentElementVisible
            }
          })]
        )
      }).filter(e => e)
    )
  }
}
