import getViewportDimensions from '../util/getViewportDimensions'
import getJumbotronCropValue from '../util/getJumbotronCropValue'
import {getImageSrc} from '../util/imageSrcHelper'

export default {
  computed: {
    src () {
      if (!this.fileReference) return ''
      const isSmDown = this.$vuetify.breakpoint.smAndDown
      const {vh} = getViewportDimensions()
      const h = Math.max(Math.round(vh * 1.4), this.height)
      const ref = Object.assign({}, this.fileReference, {resize: false})
      const {file} = ref
      if (!file) return ''
      const {xCropAmount, yCropAmount} = getJumbotronCropValue(this.height, file.height, file.width)
      return getImageSrc(
        ref.file,
        false,
        isSmDown
          // Jumbotron crop
          ? `${xCropAmount}x${yCropAmount}centro`
          // Parallax crop
          : `${xCropAmount}x${Math.min(file.height, h)}centro`
      ).src
    }
  }
}
