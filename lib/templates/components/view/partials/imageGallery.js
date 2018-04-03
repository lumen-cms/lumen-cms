import ElementSlider from './LcElementSlider.vue'
import {getImageStyleOptions, createImageCardItem} from '../helpers/imageCardHelper'

export default {
  name: 'image-gallery',
  functional: true,
  render (h, {props}) {
    const {content} = props
    const {activateLightBox, fileReferences} = content
    const {imageColumnSize} = content.properties
    const isVariableSize = imageColumnSize === 'variable'
    const classNames = content.styles.rootClassNames || []
    const size = imageColumnSize && !isVariableSize && Number(imageColumnSize.match(/\d+/g)[0])
    const styleType = getImageStyleOptions(classNames)
    const hasImageColSize = imageColumnSize && (imageColumnSize.includes('Size_') || imageColumnSize === 'variable')
    const gridClass = classNames.find(e => e.includes('grid-list-')) || 'grid-list-lg'
    const galleryItems = []

    fileReferences.forEach((fileRef, i) => {
      if (fileRef.file) {
        const colItem = createImageCardItem(h, fileRef, size, styleType, activateLightBox, i, isVariableSize)
        galleryItems.push(
          hasImageColSize ? h('v-flex', {
            'class': {
              'xs12': !!size,
              ['sm' + size]: !!size
            }
          }, colItem) : colItem)
      }
    })

    if (hasImageColSize) {
      const attrs = {
        fluid: true
      }
      attrs[gridClass] = true

      return h('v-container', {
        attrs: attrs,
        staticClass: hasImageColSize ? 'content-gallery' : ''
      }, [
        h('v-layout', {
          attrs: {
            row: true,
            wrap: true
          }
        }, galleryItems)])
    }
    return h(ElementSlider, {
      props: {
        hideBottomBar: true,
        height: '400px'
      }
    }, galleryItems)
  }
}
