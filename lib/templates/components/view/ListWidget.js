import {ArticleList} from '../../../../src/components/article/list'
import {renderListWidget} from './helpers/listWidgetHelper'

const genArticleList = (h, content) => h(ArticleList, {
  props: {
    showCount: false,
    showPagination: true,
    content
  }
})

export default {
  name: 'article-list',
  functional: true,
  render (h, {props, children}) {
    return renderListWidget(h, props, children, genArticleList)
  }
}
