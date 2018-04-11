import ENUMS from '../../../../gql/ENUMS'
import layoutItemRender from '../../../view/helpers/layoutItemHelper'
import layoutContainerRender from '../../../view/helpers/layoutContainerHelper'
import {groupBy} from '../../../view/helpers/orderByColumns'

export default {
  name: 'LcContentEditLayoutRenderer',
  props: {
    id: String,
    contentLayoutElementId: String | undefined,
    content: Object,
    languageKey: String,
    published: Boolean,
    sorting: Number,
    layoutIndex: Number | undefined,
    pageProps: Object,
    arrayIndex: Number,
    pageContents: Array
  },
  methods: {
    renderChilds (h, groupedColumn, columnIndex) {
      return groupedColumn.map((content, i) => {
        const contentElementProps = {
          content,
          id: content.id,
          languageKey: content.languageKey,
          published: content.published,
          sorting: content.sorting,
          layoutIndex: content.layoutIndex,
          contentLayoutElementId: this.contentLayoutElementId
        }


        let view = this.$cms.componentMapping[content.type] && this.$cms.componentMapping[content.type].view
        const editElements = [
          h('lc-content-edit-toolbar', {
            props: Object.assign({}, contentElementProps, {
              canDelete: true,
              pageProps: this.pageProps,
              pageContents: groupedColumn,
              renderIndex: i
            })
          }),
          h(view, {
            props: contentElementProps
          }),
          h('lc-content-create-new-button', {
            props: {
              pageProps: this.pageProps,
              pageContents: groupedColumn,
              previousElementSorting: content.sorting,
              contentLayoutElementId: this.contentLayoutElementId,
              layoutColumn: ENUMS.LAYOUT_COLUMN[columnIndex],
              layoutIndex: columnIndex + 1
            },
            style: 'bottom: 0;'
          })
        ]
        return h('div', {
          style: 'position: relative;'
        }, editElements)
      })
    }
  },
  render (h) {
    const props = this.$props
    const content = props.content
    const grouped = groupBy(content.childs)
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
      const columnElements = this.renderChilds(h, groupedColumn, columnIndex)
      return layoutItemRender(h, content.id, groupedColumn, layoutType, countOfColumns, columnIndex, columnElements, navItems, true)
    }).filter(element => !!element)
    const layoutViewElement = layoutContainerRender(h, props, layoutType, mapped, navItems)
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
