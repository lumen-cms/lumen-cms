import {classNameHandler} from '../helpers/layoutHeaderHelper'

export default {
  name: 'tabs-container',
  props: {
    id: String,
    content: Object
  },
  render (h) {
    const props = this.$props
    const children = this.$slots.default
    const {content, id} = props
    const {rootClassNames, backgroundClassNames} = content.styles
    const currentClass = {
      'content-tabs': true,
      [`data-id-${id}`]: true
    }
    let hasBackground = !!(backgroundClassNames && backgroundClassNames.length)
    classNameHandler(currentClass, rootClassNames, hasBackground)

    let options = {
      'class': currentClass,
      attrs: {
        centered: true,
        dark: !!content.properties.dark,
        grow: !!content.properties.grow
      }
    }
    if (backgroundClassNames) {
      options.attrs.color = backgroundClassNames.join(' ')
    }
    return h('v-tabs', options, children)
  }
}
