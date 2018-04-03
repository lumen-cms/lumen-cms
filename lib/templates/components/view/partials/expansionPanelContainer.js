import {classNameHandler} from '../helpers/layoutHeaderHelper'
import unshiftBgContainer from '../helpers/unshiftBgContainer'

export default {
  functional: true,
  name: 'expansion-panel-container',
  render (createElement, {props, children}) {
    const {content, id} = props
    const currentClass = {
      'content-expansion-panel': true,
      [`data-id-${id}`]: true
    }
    const {properties} = content.properties
    const {backgroundClassNames, rootClassNames} = content.styles
    classNameHandler(currentClass, rootClassNames, backgroundClassNames)
    unshiftBgContainer(createElement, children, backgroundClassNames)
    const transformedProps = {}
    if (properties) {
      transformedProps[properties] = true
    }
    return createElement('v-expansion-panel', {class: currentClass, props: transformedProps}, children)
  }
}
