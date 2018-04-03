import {layoutPanelHandler, classNameHandler} from './helpers/layoutHeaderHelper'
import layoutHeader from './partials/layoutHeader'
import unshiftBgContainer from './helpers/unshiftBgContainer'

/**
 *
 * @typedef {Object} HtmlProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'content-text-image',
  functional: true,
  render (createElement, {props, children}) {
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
    const childs = [children]
    childs.push(createElement(layoutHeader, {props: {content}}))
    layoutPanelHandler(properties, currentClass)
    classNameHandler(currentClass, styles.rootClassNames, !!(styles.backgroundClassNames && styles.backgroundClassNames.length))
    childs.push(createElement('div', {
      domProps: {
        // innerHTML: content.body
        innerHTML: content.description
      }
    }))
    unshiftBgContainer(createElement, childs, styles.backgroundClassNames)
    return createElement('div', {
      'class': currentClass,
      attrs: {
        'data-id': props.id
      }
    }, childs)
  }
}
