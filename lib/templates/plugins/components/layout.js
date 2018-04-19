import Vue from 'vue'

const components = {
  LcSideNav: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcSideNav.vue'),
  LcMainLogo: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainLogo.vue'),
  LcMainToolbar: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainToolbar.vue'),
  LcMainSearch: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainSearch.vue'),
  LcMainSidebar: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainSidebar'),
  LcPageToolbar: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcPageToolbar.vue'),
  LcMainFooter: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainFooter.vue'),
  LcLanguageSwitch: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcLanguageSwitch.vue'),
  LcErrorWidget: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcErrorWidget.vue'),
  LcError: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcError.vue'),
  LcSpinner: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcSpinner.vue'),
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'layout-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
