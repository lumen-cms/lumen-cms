import ENUMS from '../../gql/ENUMS'
import contentElementMixin from '../../mixins/contentElementMixin'
import layoutRenderMixin from '../../mixins/layoutRenderMixin'

/**
 *
 * @typedef {Object} LayoutProperties
 * @property {string} type
 * @property {string} properties
 */

export default {
  name: 'LcLayout',
  mixins: [contentElementMixin, layoutRenderMixin],
  methods: {
    genChilds (contentLayoutElementId, groupedColumn) {
      groupedColumn = groupedColumn.filter(c => c.published)
      return groupedColumn.map(content => {
        // const viewName = this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
        const viewName = `Lc${content.type}`
        const contentElementProps = {
          content,
          id: content.id,
          languageKey: content.languageKey,
          published: content.published,
          sorting: content.sorting,
          contentLayoutElementId,
          isContentElementVisible: this.isLayoutVisible
        }
        return this.$createElement(viewName, {props: contentElementProps})
      })
    }
  },
  render () {
    const props = this.$props
    // const props = this.$props
    const {content} = props
    /**
     *
     * @type LayoutProperties
     */
    const properties = content.properties || {}
    // const grouped = groupBy(content.elements)
    const grouped = this.groupBy(content.childs)
    const countOfColumns = grouped.length
    const layoutType = ENUMS.CONTENT_LAYOUT_TYPE.includes(properties.type) ? properties.type : 'Columns'
    const navItems = []

    const mapped = grouped.map((groupedColumn, index) => {
      groupedColumn.sort((a, b) => a.sorting - b.sorting)
      const columnElements = this.genChilds(props.contentLayoutElementId, groupedColumn)
      return this.genContainerItem(content.id, groupedColumn, layoutType, countOfColumns, index, columnElements, navItems)
    })
    return this.genContainer(props, layoutType, mapped, navItems)
  }
}
