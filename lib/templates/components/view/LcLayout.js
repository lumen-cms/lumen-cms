import ENUMS from '../../gql/ENUMS'
import {groupBy} from './helpers/orderByColumns'
import layoutItemRender from './helpers/layoutItemHelper'
import layoutContainerRender from './helpers/layoutContainerHelper'

/**
 *
 * @typedef {Object} LayoutProperties
 * @property {string} type
 * @property {string} properties
 */

export default {
  name: 'LcLayout',
  functional: true,
  render (h, {props}) {
    // const props = this.$props
    const {content} = props
    /**
     *
     * @type LayoutProperties
     */
    const properties = content.properties || {}
    // const grouped = groupBy(content.elements)
    const grouped = groupBy(content.childs)
    const countOfColumns = grouped.length
    const layoutType = ENUMS.CONTENT_LAYOUT_TYPE.includes(properties.type) ? properties.type : 'Columns'
    const navItems = []
    const mapped = grouped.map((groupedColumn, index) => {
      groupedColumn.sort((a, b) => a.sorting - b.sorting)
      const columnElements = createChilds(h, props.contentLayoutElementId, groupedColumn)
      return layoutItemRender(h, content.id, groupedColumn, layoutType, countOfColumns, index, columnElements, navItems)
    })

    return layoutContainerRender(h, props, layoutType, mapped, navItems)
  }
}

function createChilds (h, contentLayoutElementId, groupedColumn) {
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
      contentLayoutElementId
    }
    return h(viewName, {props: contentElementProps})
  })
}
