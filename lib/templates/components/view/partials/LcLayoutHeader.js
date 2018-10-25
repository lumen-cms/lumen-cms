import unshiftBgMixin from '../../../mixins/unshiftBgMixin'

/**
 *
 * @typedef {Object} LayoutProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'LcLayoutHeader',
  mixins: [unshiftBgMixin],
  props: {
    content: Object
  },
  render (createElement) {
    const props = this.$props
    const { content } = props
    /**
     *
     * @type RootStyles
     */
    const styles = content.styles || {}
    /**
     *
     * @type HtmlProperties
     */
    const properties = content.properties || {}
    // const {classNames, classNamesBg} = content
    const { headerClassNames, backgroundHeaderClassNames } = styles
    const hasHeader = (properties.headerLayout && properties.headerLayout !== 'Hidden') && properties.header
    const tagClass = {}
    const nestedClass = {}
    const childs = []

    if (!hasHeader) return

    // const mappedClassNamesBg = backgroundClassNames && backgroundClassNames
    //   .filter(e => e.includes('header-'))
    //   .map(e => e.replace('header-', ''))

    if (headerClassNames && Array.isArray(headerClassNames)) {
      headerClassNames.forEach(c => {
        nestedClass[c] = true;
        (
          c.includes('display') ||
          (properties.headerLayout === 'H1' && c.includes('text-xs-')) // fix text align for H1
        ) && (tagClass[c] = true)
      })
    }

    childs.push(
      createElement('div', { 'class': nestedClass }, [
        createElement(properties.headerLayout, { 'class': tagClass }, properties.header)
      ])
    )
    this.unshiftBgContainer(childs, backgroundHeaderClassNames) // todo not sure if this works. did we had header- prefix on background too?

    return createElement('div', {
      'staticClass': 'content-header'
    }, childs)
  }
}
