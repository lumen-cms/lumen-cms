import ENUMS from '../../../../gql/ENUMS'
import contentElementMixin from '../../../../mixins/contentElementMixin'
import layoutRenderMixin from '../../../../mixins/layoutRenderMixin'

export default {
  name: 'LcContentEditLayoutRenderer',
  mixins: [contentElementMixin, layoutRenderMixin],
  props: {
    pageProps: {
      type: Object
    },
    pageContents: {
      type: Array
    },
    renderIndex: {
      type: Number
    }
  },
  methods: {
    genChilds (props, groupedColumn, columnIndex) {
      return groupedColumn.map((content, i) => {
        const contentElementProps = {
          content,
          id: content.id,
          languageKey: content.languageKey,
          published: content.published,
          sorting: content.sorting,
          layoutIndex: content.layoutIndex,
          contentLayoutElementId: props.contentLayoutElementId,
          isContentElementVisible: this.isLayoutVisible
        }

        // let view = this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
        const view = `Lc${content.type}`
        const editElements = [
          this.$createElement('lc-content-edit-toolbar', {
            props: Object.assign({}, contentElementProps, {
              canDelete: true,
              pageProps: props.pageProps,
              pageContents: groupedColumn,
              renderIndex: i
            })
          }),
          this.$createElement(view, {
            props: contentElementProps
          }),
          this.$createElement('lc-content-create-new-button', {
            props: {
              pageProps: props.pageProps,
              pageContents: groupedColumn,
              previousElementSorting: content.sorting,
              contentLayoutElementId: props.contentLayoutElementId,
              layoutColumn: ENUMS.LAYOUT_COLUMN[columnIndex],
              layoutIndex: columnIndex + 1
            },
            style: 'bottom: 0;'
          })
        ]
        return this.$createElement('div', {
          style: 'position: relative;'
        }, editElements)
      })
    }
  },
  render (h) {
    const props = this.$props
    const { content } = props
    const grouped = this.groupBy(content.childs)
    const countOfColumns = grouped.length
    /**
     *
     * @type LayoutProperties
     */
    const properties = content.properties || {}
    const layoutType = ENUMS.CONTENT_LAYOUT_TYPE.includes(properties.type) ? properties.type : 'Columns'
    const navItems = []
    const mapped = grouped.map((groupedColumn, columnIndex) => {
      groupedColumn.sort((a, b) => a.sorting - b.sorting)
      const columnElements = this.genChilds(props, groupedColumn, columnIndex)
      return this.genContainerItem(content.id, groupedColumn, layoutType, countOfColumns, columnIndex, columnElements, navItems, true)
    }).filter(element => !!element)
    const layoutViewElement = this.genContainer(props, layoutType, mapped, navItems)
    const mainLayoutElements = [
      layoutViewElement,
      h('lc-content-create-new-button', {
        props: {
          pageProps: props.pageProps,
          pageContents: props.pageContents,
          previousElementSorting: props.sorting
        },
        style: 'bottom: 0;'
      }),
      h('lc-content-create-new-button', {
        props: {
          pageProps: props.pageProps,
          pageContents: [],
          contentLayoutElementId: props.contentLayoutElementId,
          layoutColumn: ENUMS.LAYOUT_COLUMN[countOfColumns],
          layoutIndex: countOfColumns + 1,
          previousElementSorting: -1,
          isNewLayoutCol: true
        }
      })
    ]
    return h('div', {
      class: 'content-edit-layout'
    }, mainLayoutElements)
  }
}
