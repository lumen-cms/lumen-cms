import layoutHeader from './partials/LcLayoutHeader'
import contentElementMixin from '../../mixins/contentElementMixin'
import unshiftBgMixin from '../../mixins/unshiftBgMixin'
import layoutPanelMixin from '../../mixins/layoutPanelMixin'
import classNamesMixin from '../../mixins/classNamesMixin'

/**
 *
 * @typedef {Object} ReadMoreProperties
 * @property {string} layoutPanel
 * @property {string} header
 * @property {string} headerLayout
 */

export default {
  name: 'LcReadMore',
  mixins: [contentElementMixin, unshiftBgMixin, layoutPanelMixin, classNamesMixin],
  render: function (h) {
    const children = this.$slots.default
    const props = this.$props
    const elements = [children]
    const { content, id } = props
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

    const { languageKey, teaser, description } = content
    const { rootClassNames, backgroundClassNames } = styles
    const currentClass = {
      'read-more-panel': true
    }
    elements.push(h(layoutHeader, { props: { content } }))
    this.layoutPanelHandler(properties, currentClass)
    this.classNameHandler(currentClass, rootClassNames, !!(backgroundClassNames && backgroundClassNames.length))
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
      elements.push(h('lc-html-renderer', { props: { content: teaser, languageKey } }))
    }
    if (content.description) {
      elements.push(h('v-expansion-panel', {},
        [h('v-expansion-panel-content', {},
          [
            h('div', { slot: 'header' }, ''),
            h('div', {},
              [h('div', {},
                [
                  h('lc-html-renderer', { props: { content: description, languageKey } })
                ])
              ]
            )
          ])
        ])
      )
    }
    this.unshiftBgContainer(elements || [], backgroundClassNames)
    return h('div', ctx, elements || [])
  }
}
