import Vue from 'vue'

const components = {
  LcSidebarLeft: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcSidebarLeft.vue'),
  LcMainLogo: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainLogo.vue'),
  LcMainSearch: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainSearch.vue'),
  LcSidebarRight: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcSidebarRight'),
  LcPageToolbar: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcPageToolbar.vue'),
  LcMainFooter: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcMainFooter.vue'),
  LcLanguageSwitch: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcLanguageSwitch.vue'),
  LcErrorWidget: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcErrorWidget.vue'),
  LcError: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcError.vue'),
  LcSystemBar: () => import(/* webpackChunkName: 'layout-chunk' */ '~cms/components/layout/LcSystemBar.vue')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'layout-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
