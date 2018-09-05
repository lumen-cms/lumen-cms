// @module getImageSrcSet
import imageHelperMixin from './imageHelperMixin'

export default {
  mixins: [imageHelperMixin],
  methods: {
    getResizeValsFromString (str) {
      const val = str || ''
      const splitted = val.split('x')
      return {
        width: !!splitted[0] && splitted[0],
        height: (!!splitted.length && !!splitted[1] && splitted[1])
      }
    },
    /**
     * @param fileObj
     * @param [heightResize=''] height resize option, mainly for jumbotron
     * @param [opts={}]
     * @returns {Object}
     */
    getImageSourceSet (fileObj, heightResize = '', opts = {}) {
      const widths = []
      const file = (fileObj && fileObj.file) || fileObj
      const fileWidth = file && file.width
      const fileHeight = file && file.height
      const resizeVals = (fileObj.resize && this.getResizeValsFromString(fileObj.resize)) || {}
      const breakpoints = [320, 480, 640, 960, 1280, 1560, 1920, 2540]

      let w = fileWidth

      if (heightResize > fileHeight) {
        heightResize = fileHeight
      }

      // No srcset if resize width and height is set
      if (resizeVals.width && resizeVals.height) {
        return false
      }
      // don't allow width > fileWidth
      if (resizeVals.width) {
        w = (w > resizeVals.width) ? resizeVals.width : w
      }

      if (w) {
        breakpoints.forEach((breakpoint) => {
          if (w > breakpoint) {
            widths.push(breakpoint)
          } else if (breakpoint === breakpoints[breakpoints.length - 1]) {
            widths.push(w)
          }
        })
      } else {
        // in case width is not set for the file in the database
        return false
      }

      return {
        srcset: widths.length ? widths
          .map(w => `${this.getFileAttrs(fileObj, w + 'x' + (heightResize || fileHeight)).src} ${w}w`)
          .join(', ') : false,
        sizes: widths.length ? widths
          .map(w => w !== widths[widths.length - 1] ? `(max-width: ${w}px) ${w}px` : `${w}px`)
          .join(', ') : false
      }
    }

  }
}
