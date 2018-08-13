import Vue from 'vue'

const components = {
  LcContentRenderer: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcContentRenderer.js'),
  LcTextImage: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcTextImage.js'),
  LcListWidget: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcListWidget.js'),
  LcLayout: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcLayout.js'),

  // article
  LcArticleList: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/article/LcArticleList.vue'),
  LcArticleListItem: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/article/LcArticleListItem.vue'),
  LcArticleListItemCard: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/article/LcArticleListItemCard.vue'),
  LcArticleListSlider: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/article/LcArticleListSlider.js'),
  LcCarousel: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/partials/LcCarousel.js'),

  // various
  LcReadMore: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcReadMore.js'),
  LcHtml: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcHtml.js'),
  LcDivider: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcDivider.js')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'content-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
