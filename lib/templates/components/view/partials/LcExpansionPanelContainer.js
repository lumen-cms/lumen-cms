import unshiftBgMixin from '../../../mixins/unshiftBgMixin'
import classNamesMixin from '../../../mixins/classNamesMixin'

export default {
  name: 'LcExpansionPanelContainer',
  mixins: [unshiftBgMixin, classNamesMixin],
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
    this.classNameHandler(currentClass, rootClassNames, backgroundClassNames)
    this.unshiftBgContainer(children, backgroundClassNames)
    const transformedProps = {}
    if (properties) {
      transformedProps[properties] = true
    }
    return h('v-expansion-panel', {class: currentClass, props: transformedProps}, children)
  }
}
