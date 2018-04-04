import {getImageSrc} from '../../../util/imageSrcHelper'

export default {
  name: 'LcMediaLibraryPreviewItem',
  functional: true,
  render (createElement, {props}) {
    const image = props.content
    // create single image
    const src = getImageSrc(image, null, '60x40').src
    return createElement('v-card', {attrs: {flat: true, tile: true, color: 'grey'}}, [
      createElement('v-card-media', {props: {src: src, height: '40px', contain: true}})
    ])
  }
}
