import contentElementMixin from '../../mixins/contentElementMixin'
import unshiftBgMixin from '../../mixins/unshiftBgMixin'
import classNamesMixin from '../../mixins/classNamesMixin'

export default {
  name: 'LcListWidget',
  mixins: [contentElementMixin, unshiftBgMixin, classNamesMixin],
  props: {
    tag: {
      type: String,
      default: 'lc-article-list'
    }
  },
  data () {
    return {
      isListWidgetVisible: false
    }
  },
  watch: {
    'isContentElementVisible' (v) {
      this.isListWidgetVisible = v
    }
  },
  methods: {
    getCurrentClass (content) {
      /**
       * @type RootStyles
       */
      const styles = content.styles || {}
      /**
       *
       * @type ListProperties
       */
      const properties = content.properties || {}
      const currentClass = {
        'content-list-widget': true,
        'content-element': true
      }
      if (properties.styleType) {
        const styleType = properties.styleType.toLowerCase()
        currentClass[styleType] = true
        if (styleType === 'slider') {
          currentClass['d-flex'] = true
        }
      } else {
        currentClass.cards = true
      }
      this.classNameHandler(
        currentClass,
        styles.rootClassNames,
        !!(styles.backgroundClassNames && styles.backgroundClassNames.length)
      )
      return currentClass
    },
    genArticleList (content) {
      return this.$createElement(this.$props.tag, {
        props: {
          showCount: false,
          showPagination: true,
          content,
          isContentElementVisible: this.isListWidgetVisible
        }
      })
    }
  },
  render (h) {
    const children = this.$slots.default
    const props = this.$props

    const elements = children ? [children] : []
    const { content } = props
    /**
     *
     * @type RootStyles
     */
    const styles = content.styles || {}
    /**
     *
     * @type ListProperties
     */
    const properties = content.properties || {}

    // visibility
    const directives = (this.contentLayoutElementId === content.id) ? [{
      name: 'observe-visibility',
      value: {
        callback: (v) => v && (this.isListWidgetVisible = true),
        once: true,
        intersection: {
          rootMargin: '350px'
        }
      }
    }] : null

    const contents = [
      h('v-container', {
        attrs: {
          fluid: true,
          'grid-list-md': true,
          'pa-0': true
        }
      }, [
        this.genArticleList(content),
        elements
      ])]
    let style
    if (properties.styleType && properties.styleType.toLowerCase() === 'slider') {
      style = `height: ${properties.sliderHeight || 500}px;`
    }
    this.unshiftBgContainer(contents, styles.backgroundClassNames)
    const elementOptions = {
      'class': this.getCurrentClass(content),
      style
    }
    if (directives) {
      elementOptions.directives = directives
    }
    return h('div', elementOptions, [contents])
  }
}
