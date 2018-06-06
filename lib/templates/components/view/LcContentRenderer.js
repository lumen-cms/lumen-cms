import hideContentOnDevice from '../../util/checkContentVisibility'

export default {
  name: 'LcContentRenderer',
  props: {
    elements: Array,
    pageProps: Object,
    device: Object
  },
  render (h) {
    const props = this.$props
    // show only published components
    const elements = props.elements
    const sorted = elements.slice(0)
      .sort((a, b) => a.sorting - b.sorting)
    const clonedElements = sorted.filter(el => el.published)
    const mappedElements = clonedElements.map((content, i) => {
      const hideElement = content.properties && content.properties.hideOnDivice
      if (hideElement && hideContentOnDevice(hideElement, props.device)) {
        return
      }
      const mappedContent = mapElement(content)
      // const viewName = this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
      const viewName = `Lc${content.type}`
      return h(viewName, {
        props: Object.assign({}, mappedContent, {
          pageContents: elements,
          pageProps: props.pageProps,
          isEditMode: false,
          arrayIndex: i,
          device: props.device
        })
      })
    })

    return h('div', {
      'staticClass': 'page-content'
    }, mappedElements)
  }
}


function mapElement (element) {
  return {
    id: element.id,
    contentLayoutElementId: element.id,
    content: element,
    languageKey: element.languageKey,
    published: element.published,
    sorting: element.sorting,
    layoutIndex: element.layoutIndex
  }
}
