import {getImageStyleOptions, createImageCardItem} from '../helpers/imageCardHelper'

export default {
  name: 'image-partial',
  props: {
    content: Object
  },
  render (h) {
    const props = this.$props
    const {content} = props
    // create single image
    const {fileRef, activateLightBox} = content
    const classNames = content.styles.rootClassNames || []
    const styleType = getImageStyleOptions(classNames)
    if (!classNames.find(e => e.includes('grid-cards-style-'))) {
      styleType.isFlatStyle = true // default true
    }
    if (!classNames.find(e => e.includes('grid-cards-theme-'))) {
      styleType.transparent = true // default
    }
    return createImageCardItem(h, fileRef, 12, styleType, activateLightBox)
  }
}
