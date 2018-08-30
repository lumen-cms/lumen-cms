import {getImageSrc} from '../../../util/imageSrcHelper'

export default {
  name: 'LcMediaLibraryPreviewItem',
  props: {
    content: Object
  },
  render (h) {
    const props = this.$props
    const image = props.content
    // create single image
    const src = getImageSrc(image, null, '60x40').src
    return h('v-card', {attrs: {flat: true, tile: true, color: 'grey'}}, [
      h('v-img', {props: {src: src, height: '40px', contain: true}})
    ])
  }
}
