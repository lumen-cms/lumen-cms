export default {
  name: 'LcTabsContentItem',
  props: {
    identifier: String
  },
  render (h) {
    const children = this.$slots.default
    const identifier = this.identifier
    return h('v-tab-item', {props: {id: identifier}}, [
      h('v-card', {props: {flat: true}}, [
        h('v-card-text', {}, children)
      ])
    ])
  }
}
