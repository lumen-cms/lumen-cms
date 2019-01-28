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
  data () {
    return {
      isLayoutVisible: false
    }
  },
  computed: {
    /**
     * Validate if the layout component needs observer for visibility
     * @return {number | *}
     */
    activateLazy () {
      const content = this.$props.content
      return content.fileReferences.length ||
        content.backgroundFileReferences.length ||
        content.childs.find(
          element =>
            (element.type === 'ListWidget') ||
            (element.fileReferences && element.fileReferences.length) ||
            (element.backgroundFileReferences && element.backgroundFileReferences.length)
        )
    }
  },
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
        navItems.push(this.$createElement('v-tab', { attrs: { href: `#${identifier}` } }, header))
      }

      const elementOptions = {
        props: {
          countOfColumns: parentLength,
          header,
          identifier,
          isEditMode
        }
      }
      return this.$createElement(itemRenderer[layoutType], elementOptions, columnElements)
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

      const elementOptions = {
        props: Object.assign({}, props, {
          isContentElementVisible: this.isLayoutVisible
        })
      }
      if (this.activateLazy) {
        elementOptions.directives = [{
          name: 'observe-visibility',
          value: {
            callback: (v) => v && (this.isLayoutVisible = true),
            once: true,
            intersection: {
              rootMargin: '350px'
            }
          }
        }]
      } else {
        this.isLayoutVisible = true // we set visibility to true as we don't need it
      }
      return this.$createElement(containerRenderer[layoutType], elementOptions, (childs.length ? childs : mapped))
    }
  }
}
