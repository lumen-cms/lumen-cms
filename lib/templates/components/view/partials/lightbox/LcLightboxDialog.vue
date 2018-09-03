<template>
  <no-ssr>
    <v-dialog content-class="lightbox-dialog"
              max-width="100vw"
              v-model="isActive"
              @keydown.esc="isActive = false"
              @keydown.right="carouselActiveItem++"
              @keydown.left="carouselActiveItem--">
      <div class="text-xs-right">
        <v-spacer/>
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
                                  :content="{fileRef:fileReferences[0],isLightbox:true}"/>
          <lc-lightbox-carousel v-else
                                :current-active="carouselActiveItem"
                                :file-references="fileReferences"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </no-ssr>
</template>
<script>
  import LcImageLightboxItem from './LcImageLightboxItem'
  import LcLightboxCarousel from './LcLightboxCarousel'

  export default {
    name: 'LcLightboxDialog',
    components: {LcLightboxCarousel, LcImageLightboxItem},
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
    methods: {
      setActiveItem (i) {
        console.log(i)
        this.carouselActiveItem = i
      },
      toggleVisibility () {
        this.isActive = !this.isActive
      }
    }
  }
</script>
