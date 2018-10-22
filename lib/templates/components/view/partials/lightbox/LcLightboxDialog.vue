<template>
  <div>
    <no-ssr>
      <v-dialog content-class="lightbox-dialog"
                max-width="100vw"
                lazy
                v-model="isActive"
                @keydown.esc="isActive = false"
                @keydown.right="carouselActiveItem++"
                @keydown.left="carouselActiveItem--">
        <div class="text-xs-right">
          <v-spacer />
          <v-btn icon
                 flat
                 round
                 dark
                 @click="isActive=false">
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <v-card>
          <v-card-text>
            <lc-image-lightbox-item v-if="fileReferences.length === 1"
                                    :content="fileReferences[0]" />
            <!--<lc-image-lightbox-item v-if="fileReferences.length === 1"-->
            <!--:content="{fileRef:fileReferences[0],isLightbox:true}"/>-->
            <v-carousel hide-delimiters
                        dark
                        :value="carouselActiveItem"
                        :cycle="false"
                        v-else>
              <v-carousel-item v-for="(item,i) in fileReferences"
                               :key="i"
                               contain>
                <lc-image-lightbox-item :content="item" />
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-dialog>
    </no-ssr>
  </div>
</template>
<script>
  import LcImageLightboxItem from './LcImageLightboxItem'
  // import {getImageSrc} from '../../../../util/imageSrcHelper'
  import imageSourceSetMixin from '../../../../mixins/getImageSourceSet'
  import imageSrcHelperMixin from '../../../../mixins/imageSrcHelperMixin'

  export default {
    name: 'LcLightboxDialog',
    mixins: [imageSourceSetMixin, imageSrcHelperMixin],
    components: { LcImageLightboxItem },
    props: {
      content: Object,
      fileReferences: Array
    },
    data () {
      return {
        isActive: false,
        carouselActiveItem: 0
      }
    },
    computed: {
      lightboxItems () {
        return this.fileReferences.map(ref => {
          const img = this.getImageSrc(ref.file)
          const { srcset, sizes } = this.getImageSourceSet(ref)
          return {
            src: img.src,
            srcset,
            sizes
          }
        })
      }
    },
    methods: {
      setActiveItem (i) {
        this.carouselActiveItem = i
      },
      toggleVisibility () {
        this.isActive = !this.isActive
      }
    }
  }
</script>
