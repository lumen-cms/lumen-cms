// import ContentEditToolbar from '../toolbar/LcContentEditToolbar.vue'
// import ContentCreateNewButton from '../LcContentCreateNewButton.vue'
import ENUMS from '../../../../gql/ENUMS'
import layoutItemRender from '../../../view/helpers/layoutItemHelper'
import layoutContainerRender from '../../../view/helpers/layoutContainerHelper'
import {groupBy} from '../../../view/helpers/orderByColumns'
// import contentElements from '../../../../../src/components/content/view'

export default {
  name: 'LcContentEditLayoutRenderer',
  functional: true,
  render (h, {props, children}) {
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
      const columnElements = renderChilds(groupedColumn, columnIndex)
      return layoutItemRender(h, content.id, groupedColumn, layoutType, countOfColumns, columnIndex, columnElements, navItems, true)
    })
    // prevent undefined entries in mapped array
      .filter(element => !!element)
    mapped.unshift(children)
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

    function renderChilds (groupedColumn, columnIndex) {
      return groupedColumn.map((content, i) => {
        const type = content.type

        const contentElementProps = {
          content,
          id: content.id,
          languageKey: content.languageKey,
          published: content.published,
          sorting: content.sorting,
          layoutIndex: content.layoutIndex,
          contentLayoutElementId: props.contentLayoutElementId
        }
        const contentEditToolbar = h('lc-content-edit-toolbar', {
          props: Object.assign({}, contentElementProps, {
            canDelete: true,
            pageProps: props.pageProps,
            pageContents: groupedColumn,
            renderIndex: i
          })
        })
        const contentElementView = h(`Lc${type}`, {
          props: contentElementProps
        })

        const editElements = [
          'lc-content-edit-toolbar',
          contentElementView,
          h('lc-content-create-new-button', {
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
        return h('div', {
          style: 'position: relative;'
        }, editElements)
      })
    }
  }
}
