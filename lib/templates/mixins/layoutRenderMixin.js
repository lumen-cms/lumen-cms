import LcColumnContainer from '../components/view/partials/LcColumnContainer'
import expansionPanelContainer from '../components/view/partials/LcExpansionPanelContainer'
import tabsContainer from '../components/view/partials/LcTabsContainer'
import expansionPanelItem from '../components/view/partials/LcExpansionPanelItem'
import LcColumnItem from '../components/view/partials/LcColumnItem'
import tabsContentItem from '../components/view/partials/LcTabsContentItem'

const containerRenderer = {
  Columns: LcColumnContainer,
  ExpansionPanel: expansionPanelContainer,
  Tabs: tabsContainer,
  Slider: 'lc-carousel'
}

const itemRenderer = {
  Columns: LcColumnItem,
  ExpansionPanel: expansionPanelItem,
  Tabs: tabsContentItem,
  Slider: 'div'
}

export default {
  methods: {
    groupBy (collection) {
      const obj = {}
      collection.forEach(item => {
        const prop = item.layoutIndex
        if (!obj[prop]) {
          obj[prop] = []
        }
        obj[prop].push(item)
      })
      // @TODO - check if sorting still needed
      return Object.keys(obj).sort((a, b) => {
        if (a < b) return -1
        if (a > b) return 1
        return 0
      }).map(e => obj[e])
    },
    genContainerItem (id, groupedColumn, layoutType, parentLength, index, columnElements, navItems, isEditMode) {
      const firstItem = groupedColumn[0]
      const header = (firstItem.properties && firstItem.properties.header) || 'Title missing...'
      let identifier
      if (layoutType === 'Tabs') {
        identifier = `tab-${id}-${index}`
        navItems.push(this.$createElement('v-tab', {attrs: {href: `#${identifier}`}}, header))
      }
      return this.$createElement(itemRenderer[layoutType], {
        props: {
          countOfColumns: parentLength,
          header,
          identifier,
          isEditMode
        }
      }, columnElements)
    },
    genContainer (props, layoutType, mapped, navItems) {
      const childs = []
      if (navItems.length && layoutType === 'Tabs') {
        childs.push(navItems)
        childs.push(
          this.$createElement('v-tabs-items', {}, mapped)
        )
      }
      layoutType === 'Slider' && (props.hideBottomBar = true)
      return this.$createElement(containerRenderer[layoutType], {props}, (childs.length ? childs : mapped))
    }
  }
}
