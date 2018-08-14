export default {
  name: 'LcExpansionPanelItem',
  props: {
    header: {
      type: String
    }
  },
  render (h) {
    const children = this.$slots.default
    const props = this.$props
    const header = props.header
    const elements = [
      h('div', {slot: 'header'}, header),
      h('v-card', {}, [
        h('v-card-text', {class: 'grey lighten-3'}, children)
      ])
    ]
    return h('v-expansion-panel-content', {}, elements)
  }
}
