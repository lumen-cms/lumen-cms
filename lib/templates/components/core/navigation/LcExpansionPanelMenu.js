import expansionPanelMenuItem from './LcExpansionPanelMenuItem.vue'

export default {
  name: 'LcExpansionPanelMenu',
  functional: true,
  render: function (h, {props}) {
    const content = props.content
    let childs = []
    Object.keys(content).forEach(navigation => {
      const root = content[navigation]
      if (Array.isArray(root)) {
        childs = root.map((item, i) => h(expansionPanelMenuItem, {props: {item, i, level: 0}}))
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
