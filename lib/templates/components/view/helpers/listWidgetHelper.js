import {classNameHandler} from './layoutHeaderHelper'
import unshiftBgContainer from './unshiftBgContainer'

/**
 *
 * @typedef {Object} ListProperties
 * @property {string} header
 * @property {string} headerLayout
 * @property {Array.<string>} categoriesIds
 * @property {number} listItemsLimit
 * @property {number} listItemsType
 * @property {number} styleType
 * @property {number} bottomBarHidden
 * @property {number} sliderHeight
 */

/**
 *
 * @param content
 * @returns {{"content-list-widget": boolean, "content-element": boolean}}
 */
export const getCurrentClass = (content) => {
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
  classNameHandler(
    currentClass,
    styles.rootClassNames,
    !!(styles.backgroundClassNames && styles.backgroundClassNames.length)
  )
  return currentClass
}

/**
 *
 * @param h
 * @param props
 * @param children
 * @param genArticleList
 * @returns {*}
 */
export const renderListWidget = (h, props, children, genArticleList) => {
  const elements = children ? [children] : []
  const {content} = props
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
  const contents = [h('v-container', {
    attrs: {
      fluid: true,
      'grid-list-md': true,
      'pa-0': true
    }
  }, [
    genArticleList(h, content),
    elements
  ])]
  let style
  if (properties.styleType && properties.styleType.toLowerCase() === 'slider') {
    style = `height: ${properties.sliderHeight || 500}px;`
  }
  unshiftBgContainer(h, contents, styles.backgroundClassNames)
  return h('div', {
    'class': getCurrentClass(content),
    style
  }, [contents])
}
