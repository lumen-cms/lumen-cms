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
    components: {
      LcImageLightboxItem
    },
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

<style lang="stylus">
  .lightbox-dialog {
    box-shadow: none;
    overflow: hidden;
    img {
      object-fit: contain;
      max-width: 100%;
      max-height: 100%;
      height: 100%
      vertical-align: middle
    }
    .v-card, .v-card-text {
      background-color: transparent;
    }
    .v-carousel {
      box-shadow: none;
      background-color: transparent;
      height: 80vh;
      .v-carousel__item {
        background-size: contain;
      }
    }
    .v-carousel__left, .v-carousel__right {
      .v-btn {
        background: rgba(158, 158, 158, 0.5)
      }
    }
    .fade {
      &-enter-active, &-leave-active, &-leave-to {
        transition: .3s ease-out
        position: absolute
        top: 0
        left: 0
      }
      &-enter, &-leave, &-leave-to {
        opacity: 0
      }
    }
  }
</style>
