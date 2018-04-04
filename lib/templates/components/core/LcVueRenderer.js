import expansionPanelMenu from './navigation/LcExpansionPanelMenu.js'

export default {
  name: 'LcVueRenderer',
  functional: true,
  render: function (h, {props}) {
    const content = props.content
    if (!content) return
    if (content.bodyJson) {
      if (props.navigation === 'expansionPanel') {
        return h(expansionPanelMenu, {props: {content: content.bodyJson}})
      }
    }
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
