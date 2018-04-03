<template>
  <v-jumbotron :height="height+'px'"
               :src="src"
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
  import getViewportDimensions from '../../../util/getViewportDimensions'

  export default {
    name: 'ContentTextJumbotron',
    props: {
      'content': {
        type: Object
      },
      'languageKey': {
        type: String
      },
      'isFirstOfPage': {
        type: Boolean
      },
      'currentClass': {
        type: String | Object
      },
      'currentAttrs': {
        type: Object
      },
      'alignEnd': {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        src: ''
      }
    },
    mounted () {
      if (this.isFirstOfPage) {
        this.$store.dispatch('setCmsJumbotron', true)
      }
      this.src = this.getSrc()
    },
    destroyed () {
      if (this.isFirstOfPage) {
        this.$store.dispatch('setCmsJumbotron', false)
      }
    },
    computed: {
      fileReference () {
        const refs = this.content.fileReferences || []
        return refs.length ? Object.assign({}, refs[0]) : {}
      },
      height () {
        const {vh} = getViewportDimensions()
        if (this.fileReference.resize) {
          return Math.min(vh, Number(this.fileReference.resize.replace(/\D/g, '')))
        } else {
          return 400
        }
      }
    },
    methods: {
      getSrc () {
        const ref = Object.assign({}, this.fileReference)
        ref.resize = ref.resize || 'x' + this.height // not sure if we should do any resizing actually

        const {xCropAmount, yCropAmount} =
          getJumbotronCropValue(this.height, this.fileReference.file.height, this.fileReference.file.width)

        const {src} = getImageSrc(this.fileReference.file, null, `${xCropAmount}x${yCropAmount}centro`)
        return src
      }
    }
  }
</script>

<style>
  img.jumbotron__image {
    z-index: -1;
  }
</style>
