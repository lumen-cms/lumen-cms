import {renderListWidget} from './helpers/listWidgetHelper'
import contentElementMixin from '../../mixins/contentElementMixin'

const genArticleList = (h, content) => h('lc-article-list', {
  props: {
    showCount: false,
    showPagination: true,
    content
  }
})

export default {
  name: 'LcListWidget',
  mixins: [contentElementMixin],
  render (h) {
    const children = this.$slots.default
    const props = this.$props
    return renderListWidget(h, props, children, genArticleList)
  }
}
