import componentRenderMixin from '../../mixins/componentRenderMixin'

export default {
  name: 'LcContentRenderer',
  mixins: [componentRenderMixin],
  props: {
    elements: Array,
    pageProps: Object
  },
  render (h) {
    // show only published components
    const clonedElements = this.sortedElements.filter(el => el.published)
    const mappedElements = clonedElements.map((content, i) => {
      const props = this.mapElement(content)
      const viewName = this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
      return h(viewName, {
        props: Object.assign({}, props, {
          pageContents: this.elements,
          isEditMode: false,
          arrayIndex: i
        })
      })
    })

    return h('div', {
      'staticClass': 'page-content'
    }, mappedElements)
  }
}
