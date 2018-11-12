import Vue from 'vue'

const components = {
  LcSidebarLeft: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcSidebarLeft.vue'),
  LcMainLogo: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcMainLogo.vue'),
  LcMainSearch: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcMainSearch.vue'),
  LcSidebarRight: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcSidebarRight'),
  LcPageToolbar: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcPageToolbar.vue'),
  LcMainFooter: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcMainFooter.vue'),
  LcLanguageSwitch: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcLanguageSwitch.vue'),
  LcErrorWidget: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcErrorWidget.vue'),
  LcError: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcError.vue'),
  LcSystemBar: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/layout/LcSystemBar.vue'),
  LcAddress: () => import(/* webpackChunkName: 'content-chunk' */  '~cms/components/layout/LcAddress.vue'),
  LcDialog: () => import(/* webpackChunkName: 'content-chunk' */  '~cms/components/layout/LcDialog.vue')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'content-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
