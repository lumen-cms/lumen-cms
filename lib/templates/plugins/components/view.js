import Vue from 'vue'

const components = {
  LcContentRenderer: () => import('~cms/components/view/LcContentRenderer.js'),
  LcTextImage: () => import('~cms/components/view/LcTextImage.js'),
  LcListWidget: () => import('~cms/components/view/LcListWidget.js'),
  LcArticleList: () => import('~cms/components/view/article/LcArticleList.vue'),
  LcArticleListItem: () => import('~cms/components/view/article/LcArticleListItem.vue'),
  LcElementSlider: () => import('~cms/components/view/partials/LcElementSlider.vue'),
  LcLayout: () => import('~cms/components/view/LcLayout.js'),
  LcReadMore: () => import('~cms/components/view/LcReadMore.js'),
  LcHtml: () => import('~cms/components/view/LcHtml.js'),
  LcDivider: () => import('~cms/components/view/LcDivider.js')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
