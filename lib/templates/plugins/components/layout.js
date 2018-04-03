import Vue from 'vue'

const components = {
  LcSideNav: () => import('~~/lib/templates/components/layout/LcSideNav.vue').then(m => m.default || m),
  LcMainLogo: () => import('~~/lib/templates/components/layout/LcMainLogo.vue').then(m => m.default || m),
  LcMainToolbar: () => import('~~/lib/templates/components/layout/LcMainToolbar.vue').then(m => m.default || m),
  LcMainSearch: () => import('~~/lib/templates/components/layout/LcMainSearch.vue').then(m => m.default || m),
  LcMainSidebar: () => import('~~/lib/templates/components/layout/LcMainSidebar').then(m => m.default || m),
  LcPageToolbar: () => import('~~/lib/templates/components/layout/LcPageToolbar.vue').then(m => m.default || m),
  LcAdminBar: () => import('~~/lib/templates/components/layout/LcAdminBar.vue').then(m => m.default || m),
  LcMainFooter: () => import('~~/lib/templates/components/layout/LcMainFooter.vue').then(m => m.default || m),
  LcLanguageSwitch: () => import('~~/lib/templates/components/layout/LcLanguageSwitch.vue').then(m => m.default || m),
  LcErrorWidget: () => import('~~/lib/templates/components/layout/LcErrorWidget.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
