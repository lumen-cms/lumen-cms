export default {
  name: 'LcVueRenderer',
  // functional: true, // does not work on initial rendere...
  render: function (h) {
    const content = this.content
    if (!content) return ''
    if (content.bodyJson) {
      if (this.navigation === 'expansionPanel') {
        return h('lc-expansion-panel-menu', {props: {content: content.bodyJson}})
      }
    }
    if (!content.body) return ''
    const tmpl = {
      template: `${content.body}`
    }
    return h(tmpl, {})
  },
  props: {
    content: {
      type: Object | String
    },
    navigation: {
      type: String,
      'default': 'expansionPanel' // allowed values: "menu|expansionPanel"
    }
  }
}
