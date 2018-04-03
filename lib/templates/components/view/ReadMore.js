import htmlRenderer from '../../HtmlRenderer'
import {layoutPanelHandler, classNameHandler} from './helpers/layoutHeaderHelper'
import unshiftBgContainer from './helpers/unshiftBgContainer'
import layoutHeader from './partials/layoutHeader'

/**
 *
 * @typedef {Object} ReadMoreProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'content-read-more',
  functional: true,
  render: function (createElement, {props, children}) {
    const elements = [children]
    const {content, id} = props
    /**
     *
     * @type RootStyles
     */
    const styles = content.styles || {}
    /**
     *
     * @type LayoutProperties
     */
    const properties = content.properties || {}

    const {languageKey, teaser, description} = content
    const {rootClassNames, backgroundClassNames} = styles
    const currentClass = {
      'read-more-panel': true
    }
    elements.push(createElement(layoutHeader, {props: {content}}))
    layoutPanelHandler(properties, currentClass)
    classNameHandler(currentClass, rootClassNames, !!(backgroundClassNames && backgroundClassNames.length))
    const ctx = {
      'class': currentClass,
      attrs: {
        'data-id': id
      },
      style: {
        position: 'relative'
      }
    }
    if (content.teaser) {
      elements.push(createElement(htmlRenderer, {props: {content: teaser, languageKey}}))
    }
    if (content.description) {
      elements.push(createElement('v-expansion-panel', {},
        [createElement('v-expansion-panel-content', {},
          [
            createElement('div', {slot: 'header'}, ''),
            createElement('div', {},
              [createElement('div', {},
                [
                  createElement(htmlRenderer, {props: {content: description, languageKey}})
                ])
              ]
            )
          ])
        ])
      )
    }
    unshiftBgContainer(createElement, elements || [], backgroundClassNames)
    return createElement('div', ctx, elements || [])
  }
}
