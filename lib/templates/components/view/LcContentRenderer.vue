<template>
  <div class="page-content">
    <component v-for="(component,i) in getChunkedElements"
               :key="i"
               v-bind="component.props"
               :is="component.viewName"/>
  </div>
</template>
<script>
  export default {
    props: {
      elements: Array,
      pageProps: Object
    },
    data () {
      return {
        isLoaded: false
      }
    },
    mounted () {
      window.addEventListener('load', () => {
        setTimeout(() => {
          // run after everything is in-place
          this.$store.dispatch('setWindowLoaded', true)
        }, 500)
      })
    },
    computed: {
      getChunkedElements () {
        if (this.$store.state.lc.windowLoaded) {
          return this.getElements
        }
        return this.getElements.slice(0, 1)
      },
      getElements () {
        const elements = this.elements
        const sorted = elements.slice(0)
          .sort((a, b) => a.sorting - b.sorting)
        const clonedElements = sorted.filter(el => el.published)
        const mappedElements = clonedElements.map((content, i) => {
          const mappedContent = this.mapElement(content)
          // const viewName = this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
          const viewName = `Lc${content.type}`
          return {
            viewName,
            props: Object.assign({}, mappedContent, {
              pageContents: elements,
              pageProps: this.pageProps,
              isEditMode: false,
              arrayIndex: i
            })
          }
        })
        return mappedElements
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
          layoutIndex: element.layoutIndex
        }
      }
    }
  }
</script>
