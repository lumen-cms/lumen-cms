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
  methods: {
    getJumbotronCropValue (jumboHeight, fileHeight, fileWidth) {
      const {vw, vh} = this.getViewportDimensions()
      if (typeof jumboHeight === 'string') {
        jumboHeight = parseInt(jumboHeight)
      }
      const valid =
        typeof jumboHeight === 'number' &&
        typeof fileHeight === 'number' &&
        typeof fileWidth === 'number' &&
        typeof vh === 'number' &&
        typeof vw === 'number'

      let xCropPos = 0
      let yCropPos = 0
      let xCropAmount = fileWidth
      let yCropAmount = fileHeight

      if (!valid) return false

      // crop left and right if the image is wider than the screen
      if (fileWidth > vw) {
        xCropPos = Math.round((fileWidth - vw) / 2)
        xCropAmount = vw
      }

      if (fileHeight > jumboHeight) {
        yCropPos = Math.round((fileHeight - jumboHeight) / 2)
        yCropAmount = jumboHeight
      }
      return {xCropPos, yCropPos, xCropAmount, yCropAmount}
    },

    getViewportDimensions () {
      const def = {vw: 1280, vh: 768}
      if (process.server) return def
      /** @type {number} */
      const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
      /** @type {number} */
      const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      return {vh, vw}
    }
  },
  computed: {
    height () {
      if (!this.fileReference) return this.defaultHeight
      const {vh} = this.getViewportDimensions()
      if (this.fileReference.resize) {
        return Math.min(vh, Number(this.fileReference.resize.replace(/\D/g, '')))
      } else {
        return this.parallaxHeight || this.defaultHeight
      }
    }
  }
}
