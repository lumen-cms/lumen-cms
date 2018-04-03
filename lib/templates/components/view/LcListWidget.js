import {renderListWidget} from './helpers/listWidgetHelper'

const genArticleList = (h, content) => h('lc-article-list', {
  props: {
    showCount: false,
    showPagination: true,
    content
  }
})

export default {
  name: 'LcListWidget',
  functional: true,
  render (h, {props, children}) {
    return renderListWidget(h, props, children, genArticleList)
  }
}
