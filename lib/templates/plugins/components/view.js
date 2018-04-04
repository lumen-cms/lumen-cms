import Vue from 'vue'

const components = {
  LcContentRenderer: () => import('<%= options.pluginRoot %>/components/view/LcContentRenderer.js'),
  LcTextImage: () => import('<%= options.pluginRoot %>/components/view/LcTextImage.js'),
  LcListWidget: () => import('<%= options.pluginRoot %>/components/view/LcListWidget.js'),
  LcArticleList: () => import('<%= options.pluginRoot %>/components/view/article/LcArticleList.vue'),
  LcArticleListItem: () => import('<%= options.pluginRoot %>/components/view/article/LcArticleListItem.vue'),
  LcElementSlider: () => import('<%= options.pluginRoot %>/components/view/partials/LcElementSlider.vue'),
  LcLayout: () => import('<%= options.pluginRoot %>/components/view/LcLayout.js'),
  LcReadMore: () => import('<%= options.pluginRoot %>/components/view/LcReadMore.js'),
  LcHtml: () => import('<%= options.pluginRoot %>/components/view/LcHtml.js'),
  LcDivider: () => import('<%= options.pluginRoot %>/components/view/LcDivider.js')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
