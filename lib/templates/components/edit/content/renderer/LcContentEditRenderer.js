export default {
  name: 'LcContentEditRenderer',
  props: {
    elements: Array,
    pageProps: Object,
    device: Object
  },
  render (h) {
    const props = this.$props
    let mappedElements
    const pageProps = props.pageProps
    const pageContents = props.elements
    const sorted = pageContents.slice(0)
      .sort((a, b) => a.sorting - b.sorting)

    if (!sorted.length) {
      mappedElements = [h('div', { style: { position: 'relative' } }, [
        h('span', { staticClass: 'subheader' }, 'Add new content...'),
        h('lc-content-create-new-button', {
          props: {
            'page-contents': [],
            'page-props': pageProps,
            'previous-element-sorting': -1
          }
        })
      ])]
    } else {
      mappedElements = sorted.map((content, i) => {
        const isLayout = content.type === 'Layout'
        const mappedContentElement = Object.assign({}, mapElement(content), {
          pageContents,
          pageProps,
          renderIndex: i
        })
        // const childView = isLayout ? 'lc-content-edit-layout-renderer' : this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
        const childView = isLayout ? 'lc-content-edit-layout-renderer' : `Lc${content.type}`
        const staticClass = `content-edit-of-${isLayout ? 'layout' : 'various'}`
        const childs = [
          h('lc-content-edit-toolbar', { props: mappedContentElement }),
          h(childView, { props: mappedContentElement }),
          h('lc-content-create-new-button', {
            style: {
              marginBottom: sorted.length - 1 === i ? '100px' : '',
              position: 'relative'
            },
            props: {
              pageContents,
              pageProps,
              previousElementSorting: mappedContentElement.sorting
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
        return h('div', { staticClass: staticClass }, childs)
      })
    }

    return h('div', {
      staticClass: 'page-content edit-mode'
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
