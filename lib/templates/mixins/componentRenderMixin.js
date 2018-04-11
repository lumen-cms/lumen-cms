export default {
  computed: {
    sortedElements () {
      return this.elements.slice(0)
        .sort((a, b) => a.sorting - b.sorting)
    }
  },
  methods: {
    mapElement (element) {
      return {
        id: element.id,
        contentLayoutElementId: element.id,
        content: element,
        languageKey: element.languageKey,
        published: element.published,
        sorting: element.sorting,
        layoutIndex: element.layoutIndex,
        pageProps: this.pageProps
      }
    }
  }
}
