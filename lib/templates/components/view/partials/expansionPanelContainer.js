import {classNameHandler} from '../helpers/layoutHeaderHelper'
import unshiftBgContainer from '../helpers/unshiftBgContainer'

export default {
  name: 'expansion-panel-container',
  props: {
    content: Object,
    id: String
  },
  render (h) {
    const children = this.$slots.default
    const props = this.$props
    const {content, id} = props
    const currentClass = {
      'content-expansion-panel': true,
      [`data-id-${id}`]: true
    }
    const {properties} = content.properties
    const {backgroundClassNames, rootClassNames} = content.styles
    classNameHandler(currentClass, rootClassNames, backgroundClassNames)
    unshiftBgContainer(h, children, backgroundClassNames)
    const transformedProps = {}
    if (properties) {
      transformedProps[properties] = true
    }
    return h('v-expansion-panel', {class: currentClass, props: transformedProps}, children)
  }
}
