export default {
  name: 'LcExpansionPanelMenu',
  render: function (h) {
    const content = this.content
    let childs = []
    Object.keys(content).forEach(navigation => {
      const root = content[navigation]
      if (Array.isArray(root)) {
        childs = root.map((item, i) => h('lc-expansion-panel-menu-item', {props: {item, i, level: 0}}))
      }
    })
    return h('v-list', {props: {dense: true, subheader: true}}, childs)
  },
  props: {
    content: {
      type: Object,
      'default': () => {
      }
    }
  }
}
