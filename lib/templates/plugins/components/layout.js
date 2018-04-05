import Vue from 'vue'

const components = {
  LcSideNav: () => import('~cms/components/layout/LcSideNav.vue'),
  LcMainLogo: () => import('~cms/components/layout/LcMainLogo.vue'),
  LcMainToolbar: () => import('~cms/components/layout/LcMainToolbar.vue'),
  LcMainSearch: () => import('~cms/components/layout/LcMainSearch.vue'),
  LcMainSidebar: () => import('~cms/components/layout/LcMainSidebar'),
  LcPageToolbar: () => import('~cms/components/layout/LcPageToolbar.vue'),
  LcAdminBar: () => import('~cms/components/layout/LcAdminBar.vue'),
  LcMainFooter: () => import('~cms/components/layout/LcMainFooter.vue'),
  LcLanguageSwitch: () => import('~cms/components/layout/LcLanguageSwitch.vue'),
  LcErrorWidget: () => import('~cms/components/layout/LcErrorWidget.vue'),
  LcError: () => import('~cms/components/layout/LcError.vue')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
