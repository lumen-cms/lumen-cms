export default {
  name: 'LcContentRenderer',
  functional: true,
  render: function (h, {props}) {
    // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    let clonedElements = props.elements.slice(0)
      .sort((a, b) => a.sorting - b.sorting)

    clonedElements = clonedElements.filter(el => el.published)

    const mappedElements = clonedElements.map((content, i) => {
      const type = content.type
      const currentComponent = `Lc${type}`
      return h(currentComponent, {
        props: {
          contentLayoutElementId: content.id,
          pageContents: props.elements,
          pageProps: props.pageProps,
          id: content.id,
          content,
          languageKey: content.languageKey,
          published: content.published,
          sorting: content.sorting,
          isEditMode: false,
          arrayIndex: i
        }
      })
    })

    return h('div', {
      'staticClass': 'page-content'
    }, mappedElements)
  }
}
