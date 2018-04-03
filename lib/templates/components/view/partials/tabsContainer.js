import { classNameHandler } from '../helpers/layoutHeaderHelper'
import unshiftBgContainer from '../helpers/unshiftBgContainer'

export default {
  name: 'tabs-container',
  functional: true,
  render (createElement, {props, children}) {
    const {content, id} = props
    const {rootClassNames, backgroundClassNames} = content.styles
    const currentClass = {
      'content-tabs': true,
      [`data-id-${id}`]: true
    }
    classNameHandler(currentClass, rootClassNames, !!(backgroundClassNames && backgroundClassNames.length))
    unshiftBgContainer(createElement, children, backgroundClassNames)
    return createElement('v-tabs', {
      'class': currentClass,
      attrs: {
        centered: true
      }
    }, children)
  }
}
