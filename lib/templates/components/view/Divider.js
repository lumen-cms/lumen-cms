import {classNameHandler} from './helpers/layoutHeaderHelper'
import unshiftBgContainer from './helpers/unshiftBgContainer'

/**
 *
 * @typedef {Object} DividerProperties
 * @property {string} icon
 * @property {string} iconSize
 */
/**
 *
 * @typedef {Object} RootStyles
 * @property {string} backgroundClassNames
 * @property {string} backgroundHeaderClassNames
 * @property {string} rootClassNames
 * @property {string} contentClassNames
 * @property {string} headerClassNames
 */

export default {
  name: 'content-divider',
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
     * @type DividerProperties
     */
    const properties = content.properties || {}
    const classNames = {
      'h-separator': true,
      'mt-4': !styles.rootClassNames,
      'mb-4': !styles.rootClassNames,
      'h-separator-icon': !!properties.icon,
      'divider': !properties.icon
    }
    const attrs = {
      'data-id': props.id
    }
    const childItems = []

    styles.rootClassNames && classNameHandler(classNames, styles.rootClassNames)

    if (properties.icon) {
      if (properties.iconSize) classNames[properties.iconSize] = true
      childItems.push(
        createElement('span', {}, [
          createElement('v-icon', {
            'class': {
              'icon--medium': properties.iconSize === 'Medium',
              'icon--large': properties.iconSize === 'Large',
              'icon--x-large': properties.iconSize === 'XLarge'
            }
          }, properties.icon)
        ])
      )
      unshiftBgContainer(createElement, childItems, styles.backgroundClassNames)
    }

    return createElement('div', {
      'class': classNames, attrs
    }, [children, createElement('div', {}, [
      createElement(properties.icon ? 'div' : 'span', {}, childItems)
    ])])
  }
}
