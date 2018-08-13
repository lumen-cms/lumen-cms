import {layoutPanelHandler, classNameHandler} from './helpers/layoutHeaderHelper'
import layoutHeader from './partials/layoutHeader'
import unshiftBgContainer from './helpers/unshiftBgContainer'
import contentElementMixin from '../../mixins/contentElementMixin'

/**
 *
 * @typedef {Object} HtmlProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'LcHtml',
  mixins: [contentElementMixin],
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
    layoutPanelHandler(properties, currentClass)
    classNameHandler(currentClass, styles.rootClassNames, !!(styles.backgroundClassNames && styles.backgroundClassNames.length))
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
    unshiftBgContainer(h, childs, styles.backgroundClassNames)
    return h('div', {
      'class': currentClass,
      attrs: {
        'data-id': props.id
      }
    }, childs)
  }
}
