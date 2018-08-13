export default {
  name: 'LcToolbarMenu',
  render: function (h) {
    const content = this.content
    let childs = []
    Object.keys(content).forEach(navigation => {
      const root = content[navigation]
      if (Array.isArray(root)) {
        childs = root.map((item, i) => h('lc-toolbar-menu-item', {props: {item, i, level: 0, small: this.small}}))
      }
    })
    return h('v-layout', {props: {row: true}}, childs)
  },
  props: {
    content: {
      type: Object,
      'default': () => {
      }
    },
    small: {
      type: Boolean
    }
  }
}
