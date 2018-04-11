import componentRenderMixin from '../../../../mixins/componentRenderMixin'

export default {
  name: 'LcContentEditRenderer',
  mixins: [componentRenderMixin],
  props: {
    elements: Array,
    pageProps: Object
  },
  render (h) {
    let mappedElements
    if (!this.sortedElements.length) {
      mappedElements = h('div', {style: {position: 'relative'}}, [
        h('span', {staticClass: 'subheader'}, this.$t('addNewContent')),
        h('lc-content-create-new-button', {
          props: {
            'page-contents': [],
            'page-props': this.pageProps,
            'previous-element-sorting': -1
          }
        })
      ])
    } else {
      mappedElements = this.sortedElements.map((content, i) => {
        const isLayout = content.type === 'Layout'
        const props = this.mapElement(content)
        props.pageContents = this.elements
        props.renderIndex = i
        const childView = isLayout ? 'lc-content-edit-layout-renderer' : this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
        const staticClass = isLayout ? 'content-edit-of-layout' : 'content-edit-of-various'
        const childs = [
          h('lc-content-edit-toolbar', {props}),
          h(childView, {props}),
          h('lc-content-create-new-button', {
            style: {
              marginBottom: this.sortedElements.length - 1 === i ? '100px' : ''
            },
            props: {
              pageContents: this.elements,
              pageProps: this.pageProps,
              previousElementSorting: props.sorting
            }
          })
        ]
        if (!childView) {
          childs.push(h('v-alert', {
            props: {
              color: 'error',
              value: true
            }
          }, 'Invalid content element - need to be deleted?'))
        }
        return h('div', {staticClass: staticClass}, childs)
      })
    }

    return h('div', {
      staticClass: 'page-content edit-mode'
    }, mappedElements)
  }
}
