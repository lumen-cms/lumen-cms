import {layoutPanelHandler, classNameHandler} from './helpers/layoutHeaderHelper'
import unshiftBgContainer from './helpers/unshiftBgContainer'
import layoutHeader from './partials/layoutHeader'
import contentElementMixin from '../../mixins/contentElementMixin'

/**
 *
 * @typedef {Object} ReadMoreProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'LcReadMore',
  mixins: [contentElementMixin],
  render: function (h) {
    const children = this.$slots.default
    const props = this.$props
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
    elements.push(h(layoutHeader, {props: {content}}))
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
      elements.push(h('lc-html-renderer', {props: {content: teaser, languageKey}}))
    }
    if (content.description) {
      elements.push(h('v-expansion-panel', {},
        [h('v-expansion-panel-content', {},
          [
            h('div', {slot: 'header'}, ''),
            h('div', {},
              [h('div', {},
                [
                  h('lc-html-renderer', {props: {content: description, languageKey}})
                ])
              ]
            )
          ])
        ])
      )
    }
    unshiftBgContainer(h, elements || [], backgroundClassNames)
    return h('div', ctx, elements || [])
  }
}
