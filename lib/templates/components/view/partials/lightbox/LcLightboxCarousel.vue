<template>
  <v-carousel hide-delimiters
              dark
              :value="currentActive"
              :cycle="false">
    <v-carousel-item v-for="(item,i) in genCarouselItems"
                     :key="i"
                     contain
                     :src="item.src"
                     :srcset="item.srcset"
                     :sizes="item.sizes"/>
  </v-carousel>
</template>
<script>
  import {getImageSrc} from '../../../../util/imageSrcHelper'
  import getImageSourceSet from '../../../../util/getImageSourceSet'

  export default {
    name: 'LcLightboxCarousel',
    props: {
      fileReferences: Array,
      currentActive: {
        type: Number,
        default: 0
      }
    },
    computed: {
      genCarouselItems () {
        return this.fileReferences.map(ref => {
          const img = getImageSrc(ref.file)
          const {srcset, sizes} = getImageSourceSet(ref)
          return {
            src: img.src,
            srcset,
            sizes
          }
        })
      }
    }
  }
</script>
