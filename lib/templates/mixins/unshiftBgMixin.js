import LcBackgroundContainer from '../components/view/partials/LcBackgroundContainer'

export default {
  components: {LcBackgroundContainer},
  methods: {
    /**
     *
     * @param {function} h - the createElement function
     * @param {array} items
     * @param {array} [classNamesBg]
     * @param {object} [additionalProps]
     * @returns {array}
     */
    unshiftBgContainer (items, backgroundClassNames, additionalProps) {
      if ((backgroundClassNames && backgroundClassNames.length) || additionalProps) {
        const props = Object.assign({}, {backgroundClassNames}, additionalProps || {})
        items.unshift(this.$createElement('lc-background-container', {props}))
      }
      return items
    }
  }
}
