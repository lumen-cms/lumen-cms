<template>
  <div :class="currentClass">
    <lc-image :height="height"
              :src="src">
      <v-container fill-height>
        <v-layout :align-center="!alignEnd" :align-end="alignEnd">
          <v-flex text-xs-center>
            <slot/>
          </v-flex>
        </v-layout>
      </v-container>
    </lc-image>
  </div>
</template>
<script>
  // import {getImageSrc} from '../../../util/imageSrcHelper'
  import getJumbotronCropValue from '../../../util/getJumbotronCropValue'
  import parallaxMixin from '../../../mixins/parallaxMixin'
  import imageSrcMixin from '../../../mixins/imageSrcHelperMixin'
  import LcImage from './LcImage'

  export default {
    name: 'LcJumbotron',
    mixins: [parallaxMixin, imageSrcMixin],
    components: {LcImage},
    props: {
      alignEnd: {
        type: Boolean,
        default: false
      },
      defaultHeight: {
        type: Number,
        default: 400
      }
    },
    computed: {
      src () {
        const ref = Object.assign({}, this.fileReference)
        ref.resize = ref.resize || 'x' + this.height // not sure if we should do any resizing actually
        const file = this.fileReference.file
        if (!file) {
          return ''
        }
        const {xCropAmount, yCropAmount} = getJumbotronCropValue(this.height, file.height, file.width)

        const {src} = this.getImageSrc(file, null, `${xCropAmount}x${yCropAmount}centro`)
        return src
      }
    }
  }
</script>
