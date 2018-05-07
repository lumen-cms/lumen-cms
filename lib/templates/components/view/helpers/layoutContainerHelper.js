import columnContainer from '../partials/columnContainer'
import expansionPanelContainer from '../partials/expansionPanelContainer'
import tabsContainer from '../partials/tabsContainer'
// import ElementSlider from '../partials/LcElementSlider.vue'
import LcCarousel from '../partials/LcCarousel'

const containerRenderer = {
  Columns: columnContainer,
  ExpansionPanel: expansionPanelContainer,
  Tabs: tabsContainer,
  Slider: LcCarousel
}

/**
 *
 * @param createElement
 * @param props
 * @param layoutType
 * @param mapped
 * @param navItems
 * @returns {*}
 */
export default function (h, props, layoutType, mapped, navItems) {
  const childs = []
  if (navItems.length && layoutType === 'Tabs') {
    childs.push(navItems)
    childs.push(
      h('v-tabs-items', {}, mapped)
    )
  }
  layoutType === 'Slider' && (props.hideBottomBar = true)
  return h(containerRenderer[layoutType], {props}, (childs.length ? childs : mapped))
}
