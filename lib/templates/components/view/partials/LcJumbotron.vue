<template>
  <v-jumbotron v-if="src"
               class="lazyload"
               alt="jumbotron-image"
               :height="height+'px'"
               src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
               :data-prx="src"
               dark>
    <v-container fill-height>
      <v-layout :align-center="!alignEnd" :align-end="alignEnd">
        <v-flex text-xs-center>
          <slot/>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>
<script>
  import {getImageSrc} from '../../../util/imageSrcHelper'
  import getJumbotronCropValue from '../../../util/getJumbotronCropValue'
  import parallaxMixin from '../../../mixins/parallaxMixin'

  export default {
    name: 'LcJumbotron',
    mixins: [parallaxMixin],
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

        const {src} = getImageSrc(file, null, `${xCropAmount}x${yCropAmount}centro`)
        return src
      }
    }
  }
</script>
