import Vue from 'vue'

const components = {
  LcContentRenderer: () => import('~~/lib/templates/components/view/LcContentRenderer.js').then(m => m.default || m),
  LcTextImage: () => import('~~/lib/templates/components/view/LcTextImage.js').then(m => m.default || m),
  LcListWidget: () => import('~~/lib/templates/components/view/LcListWidget.js').then(m => m.default || m),
  LcArticleList: () => import('~~/lib/templates/components/view/article/LcArticleList.vue').then(m => m.default || m),
  LcArticleListItem: () => import('~~/lib/templates/components/view/article/LcArticleListItem.vue').then(m => m.default || m),
  LcElementSlider: () => import('~~/lib/templates/components/view/partials/LcElementSlider.vue').then(m => m.default || m),
  LcLayout: () => import('~~/lib/templates/components/view/LcLayout.js').then(m => m.default || m),
  LcReadMore: () => import('~~/lib/templates/components/view/LcReadMore.js').then(m => m.default || m),
  LcHtml: () => import('~~/lib/templates/components/view/LcHtml.js').then(m => m.default || m),
  LcDivider: () => import('~~/lib/templates/components/view/LcDivider.js').then(m => m.default || m)
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
