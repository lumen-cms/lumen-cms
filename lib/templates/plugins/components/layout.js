import Vue from 'vue'

const components = {
  LcSideNav: () => import('<%= options.pluginRoot %>/components/layout/LcSideNav.vue').then(m => m.default || m),
  LcMainLogo: () => import('<%= options.pluginRoot %>/components/layout/LcMainLogo.vue').then(m => m.default || m),
  LcMainToolbar: () => import('<%= options.pluginRoot %>/components/layout/LcMainToolbar.vue').then(m => m.default || m),
  LcMainSearch: () => import('<%= options.pluginRoot %>/components/layout/LcMainSearch.vue').then(m => m.default || m),
  LcMainSidebar: () => import('<%= options.pluginRoot %>/components/layout/LcMainSidebar').then(m => m.default || m),
  LcPageToolbar: () => import('<%= options.pluginRoot %>/components/layout/LcPageToolbar.vue').then(m => m.default || m),
  LcAdminBar: () => import('<%= options.pluginRoot %>/components/layout/LcAdminBar.vue').then(m => m.default || m),
  LcMainFooter: () => import('<%= options.pluginRoot %>/components/layout/LcMainFooter.vue').then(m => m.default || m),
  LcLanguageSwitch: () => import('<%= options.pluginRoot %>/components/layout/LcLanguageSwitch.vue').then(m => m.default || m),
  LcErrorWidget: () => import('<%= options.pluginRoot %>/components/layout/LcErrorWidget.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
