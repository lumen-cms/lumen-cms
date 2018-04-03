import expansionPanelItem from '../partials/expansionPanelItem'
import columnItem from '../partials/columnItem'
import tabsContentItem from '../partials/tabsContentItem'
import divContainer from '../partials/divContainer'

const itemRenderer = {
  Columns: columnItem,
  ExpansionPanel: expansionPanelItem,
  Tabs: tabsContentItem,
  Slider: divContainer
}

/**
 *
 * @param h
 * @param id
 * @param groupedColumn
 * @param layoutType
 * @param parentLength
 * @param index
 * @param columnElements
 * @param navItems
 * @param [isEditMode]
 * @returns {*}
 */
export default function (h, id, groupedColumn, layoutType, parentLength, index, columnElements, navItems, isEditMode) {
  const firstItem = groupedColumn[0]
  const header = (firstItem.properties && firstItem.properties.header) || 'Title missing...'
  let identifier
  if (layoutType === 'Tabs') {
    identifier = `tab-${id}-${index}`
    navItems.push(h('v-tab', {attrs: {href: `#${identifier}`}}, header))
  }
  return h(itemRenderer[layoutType], {
    props: {
      countOfColumns: parentLength,
      header,
      identifier,
      isEditMode
    }
  }, columnElements)
}
