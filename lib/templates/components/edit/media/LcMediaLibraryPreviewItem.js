// import {getImageSrc} from '../../../util/imageSrcHelper'
import imageSrcHelperMixin from '../../../mixins/imageSrcHelperMixin'

export default {
  name: 'LcMediaLibraryPreviewItem',
  mixins: [imageSrcHelperMixin],
  props: {
    content: Object
  },
  render (h) {
    const props = this.$props
    const image = props.content
    // create single image
    const src = this.getImageSrc(image, null, '60x40').src
    return h('v-card', {attrs: {flat: true, tile: true, color: 'grey'}}, [
      h('v-img', {props: {src: src, height: '40px', contain: true}})
    ])
  }
}
