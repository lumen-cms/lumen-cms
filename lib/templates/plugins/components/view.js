import Vue from 'vue'

const components = {
  LcContentRenderer: () => import('<%= options.pluginRoot %>/components/view/LcContentRenderer.js').then(m => m.default || m),
  LcTextImage: () => import('<%= options.pluginRoot %>/components/view/LcTextImage.js').then(m => m.default || m),
  LcListWidget: () => import('<%= options.pluginRoot %>/components/view/LcListWidget.js').then(m => m.default || m),
  LcArticleList: () => import('<%= options.pluginRoot %>/components/view/article/LcArticleList.vue').then(m => m.default || m),
  LcArticleListItem: () => import('<%= options.pluginRoot %>/components/view/article/LcArticleListItem.vue').then(m => m.default || m),
  LcElementSlider: () => import('<%= options.pluginRoot %>/components/view/partials/LcElementSlider.vue').then(m => m.default || m),
  LcLayout: () => import('<%= options.pluginRoot %>/components/view/LcLayout.js').then(m => m.default || m),
  LcReadMore: () => import('<%= options.pluginRoot %>/components/view/LcReadMore.js').then(m => m.default || m),
  LcHtml: () => import('<%= options.pluginRoot %>/components/view/LcHtml.js').then(m => m.default || m),
  LcDivider: () => import('<%= options.pluginRoot %>/components/view/LcDivider.js').then(m => m.default || m)
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
