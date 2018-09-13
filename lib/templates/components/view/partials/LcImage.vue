<template>
  <component :is="componentTag"
             v-bind="$props"
             :style="componentStyles">
    <v-layout slot="placeholder"
              v-if="src"
              fill-height
              align-center
              justify-center
              ma-0>
      <v-progress-circular indeterminate color="grey darken-1"></v-progress-circular>
    </v-layout>
    <slot/>
  </component>
</template>
<script>
  export default {
    name: 'LcImage',
    props: {
      // all v-img props needs to be applied https://vuetifyjs.com/en/components/images
      lazySrc: String,
      src: String,
      height: Number | String,
      aspectRatio: Number | String,
      contain: Boolean,
      maxHeight: Number | String,
      sizes: String,
      srcset: String,
      width: String | Number,
      isFigure: Boolean,
      isVisible: Boolean
    },
    computed: {
      componentTag () {
        return this.isVisible ? 'v-img' : 'div' // need to do this due to v-img not working otherwise..
      },
      componentStyles () {
        if (!this.isVisible && this.height) {
          return `height: ${this.height}`
        }
      }
    }
  }
</script>
