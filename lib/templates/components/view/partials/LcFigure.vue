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
    <figure>
      <img :src="genSrc"
           :srcset="genSrcset"
           :sizes="sizes"
           :class="{'img-cover':!contain, 'img-rounded':isRounded}">
    </figure>
    <slot/>
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
      isRounded: Boolean,
      isVisible: Boolean
    },
    computed: {
      genSrc () {
        return this.isVisible ? this.src : null
      },
      genSrcset () {
        return this.isVisible ? this.srcset : null
      }
    }
  }
</script>
