import LcImageCardItem from './LcImageCardsItem'
import imageCardMixin from '../../../mixins/imageCardMixin'

export default {
  name: 'LcImageCards',
  mixins: [imageCardMixin],
  props: {
    content: Object,
    isContentElementVisible: Boolean
  },
  render (h) {
    const { activateLightBox, fileReferences } = this.content
    const { imageColumnSize } = this.content.properties
    const isVariableSize = imageColumnSize === 'variable'
    const classNames = this.content.styles.rootClassNames || []
    let size = imageColumnSize && !isVariableSize && Number(imageColumnSize.match(/\d+/g)[0])
    const styleType = this.getImageStyleOptions(classNames)
    const gridClass = classNames.find(e => e.includes('grid-list-')) || 'grid-list-lg'

    const galleryItems = fileReferences.map((fileRef, i) => {
      if (!fileRef.file) return
      return h('v-flex', {
        'class': {
          'xs12': !!size,
          ['sm' + size]: !!size
        }
      }, [h(LcImageCardItem, {
        props: {
          fileRef,
          size,
          styleType,
          activateLightBox,
          index: i,
          isVariableSize,
          isContentElementVisible: this.isContentElementVisible
        }
      })])
    }).filter(e => e)
    const attrs = {
      fluid: true
    }
    attrs[gridClass] = true

    return h('v-container', {
      attrs: attrs,
      staticClass: 'content-gallery'
    }, [
      h('v-layout', {
        attrs: {
          row: true,
          wrap: true
        }
      }, galleryItems)])
  }
}
