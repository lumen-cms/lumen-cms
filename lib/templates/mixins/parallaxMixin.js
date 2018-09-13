import getViewportDimensions from '../util/getViewportDimensions'

export default {
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
    fileReference: {
      type: Object
    },
    parallaxHeight: {
      type: Number | String
    },
    isContentElementVisible: {
      type: Boolean
    }
  },
  mounted () {
    if (this.isFirstOfPage) {
      this.$store.dispatch('setCmsJumbotron', true)
    }
  },
  destroyed () {
    if (this.isFirstOfPage) {
      this.$store.dispatch('setCmsJumbotron', false)
    }
  },
  computed: {
    height () {
      const {vh} = getViewportDimensions()
      if (this.fileReference.resize) {
        return Math.min(vh, Number(this.fileReference.resize.replace(/\D/g, '')))
      } else {
        return this.defaultHeight
      }
    }
  }
}
