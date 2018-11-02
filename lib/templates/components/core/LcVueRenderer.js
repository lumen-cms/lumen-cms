export default {
  name: 'LcVueRenderer',
  render: function (h) {
    const content = this.computedContent
    if (!content) return ''
    if (!this.$store.getters.isPageTemplateVisible(this.$cms, this.templateRegion)) {
      // check if template should be visible
      return ''
    }
    if (content.bodyJson && content.type === 'JSON') {
      if (this.navigation === 'expansionPanel') {
        return h('lc-expansion-panel-menu', { props: { content: content.bodyJson } })
      }
      if (this.navigation === 'menu') {
        return h('lc-toolbar-menu', { props: { content: content.bodyJson, small: this.small } })
      }
      if (this.navigation === 'columns') {
        return h('lc-columns-menu', { props: { content: content.bodyJson, dark: this.dark } })
      }
    }
    if (!content.body) return ''
    const tmpl = {
      template: `${content.body}`
    }
    return h(tmpl, {})
  },
  computed: {
    computedContent () {
      if (this.templateRegion && this.$store.state.lc.pageTemplates) {
        return this.$store.getters.getPageTemplate(this.templateRegion)
      } else if (this.content) {
        return this.content
      }
    }
  },
  props: {
    content: {
      type: Object | String
    },
    navigation: {
      type: String,
      'default': 'expansionPanel' // allowed values: "menu|expansionPanel|columns"
    },
    templateRegion: {
      type: String
    },
    small: {
      type: Boolean
    },
    dark: {
      type: Boolean
    }
  }
}
