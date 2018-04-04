import Vue from 'vue'

const components = {
  LcSideNav: () => import('<%= options.pluginRoot %>/components/layout/LcSideNav.vue'),
  LcMainLogo: () => import('<%= options.pluginRoot %>/components/layout/LcMainLogo.vue'),
  LcMainToolbar: () => import('<%= options.pluginRoot %>/components/layout/LcMainToolbar.vue'),
  LcMainSearch: () => import('<%= options.pluginRoot %>/components/layout/LcMainSearch.vue'),
  LcMainSidebar: () => import('<%= options.pluginRoot %>/components/layout/LcMainSidebar'),
  LcPageToolbar: () => import('<%= options.pluginRoot %>/components/layout/LcPageToolbar.vue'),
  LcAdminBar: () => import('<%= options.pluginRoot %>/components/layout/LcAdminBar.vue'),
  LcMainFooter: () => import('<%= options.pluginRoot %>/components/layout/LcMainFooter.vue'),
  LcLanguageSwitch: () => import('<%= options.pluginRoot %>/components/layout/LcLanguageSwitch.vue'),
  LcErrorWidget: () => import('<%= options.pluginRoot %>/components/layout/LcErrorWidget.vue')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
