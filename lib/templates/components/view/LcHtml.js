import layoutHeader from './partials/LcLayoutHeader'
import contentElementMixin from '../../mixins/contentElementMixin'
import unshiftBgMixin from '../../mixins/unshiftBgMixin'
import layoutPanelMixin from '../../mixins/layoutPanelMixin'
import classNamesMixin from '../../mixins/classNamesMixin'

/**
 *
 * @typedef {Object} HtmlProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'LcHtml',
  mixins: [contentElementMixin, unshiftBgMixin, layoutPanelMixin, classNamesMixin],
  render (h) {
    const children = this.$slots.default
    const props = this.$props
    const content = props.content
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
    const currentClass = {
      'content-element': true,
      'raw-html': true
    }
    const childs = children ? [children] : []
    childs.push(h(layoutHeader, {props: {content}}))
    this.layoutPanelHandler(properties, currentClass)
    this.classNameHandler(currentClass, styles.rootClassNames, !!(styles.backgroundClassNames && styles.backgroundClassNames.length))
    if (properties.isVueRenderer) {
      // compile with vue-renderer
      content.description && childs.push(h('lc-vue-renderer', {props: {content: {body: content.description}}}))
    } else {
      // standard html code like IFrames
      childs.push(h('div', {
        domProps: {
          innerHTML: content.description
        }
      }))
    }
    this.unshiftBgContainer(childs, styles.backgroundClassNames)
    return h('div', {
      'class': currentClass,
      attrs: {
        'data-id': props.id
      }
    }, childs)
  }
}
