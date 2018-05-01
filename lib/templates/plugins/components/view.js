import Vue from 'vue'

const components = {
  LcContentRenderer: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcContentRenderer.js'),
  LcTextImage: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcTextImage.js'),
  LcListWidget: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcListWidget.js'),
  LcArticleList: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/article/LcArticleList.vue'),
  LcArticleListItem: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/article/LcArticleListItem.vue'),
  LcElementSlider: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/partials/LcElementSlider.vue'),
  LcLayout: () => import( /* webpackChunkName: 'content-chunk' */ '~cms/components/view/LcLayout.js'),
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
