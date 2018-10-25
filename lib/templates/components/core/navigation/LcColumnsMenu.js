export default {
  name: 'LcColumnsMenu',
  render: function (h) {
    const content = this.content
    let childs = []
    Object.keys(content).forEach(navigation => {
      const root = content[navigation]
      if (Array.isArray(root)) {
        childs = root.map((item, i) => h('lc-columns-menu-item', { props: { item, i, level: 0, dark: this.dark } }))
      }
    })
    return h('v-container', { attrs: { fluid: true } }, [
      h('v-layout', {}, childs)
    ])
  },
  props: {
    content: {
      type: Object,
      'default': () => {
      }
    },
    dark: Boolean
  }
}
