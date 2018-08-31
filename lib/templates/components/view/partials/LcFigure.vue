<template>
  <div>
    <v-layout slot="placeholder"
              v-if="!src"
              fill-height
              align-center
              justify-center
              ma-0>
      <v-progress-circular indeterminate color="grey darken-1"></v-progress-circular>
    </v-layout>
    <figure v-observe-visibility="{callback: visibilityChanged,throttle: 300}">
      <img :src="genSrc"
           :srcset="genSrcset"
           :sizes="sizes"
           :class="{'img-cover':!contain, 'img-rounded':isRounded}">
    </figure>
  </div>
</template>
<script>
  export default {
    name: 'LcFigure',
    props: {
      lazySrc: String,
      src: String,
      height: Number | String,
      contain: Boolean,
      maxHeight: Number | String,
      sizes: String,
      srcset: String,
      width: String | Number,
      isRounded: Boolean
    },
    data () {
      return {
        isVisible: false,
        genSrc: null,
        genSrcset: null
      }
    },

    methods: {
      visibilityChanged (isVisible) {
        if (isVisible) {
          this.genSrc = this.src
          this.genSrcset = this.srcset
        }
      }
    }
  }
</script>
