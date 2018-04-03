import Vue from 'vue'

const components = {
  LcSideNav: () => import('~~/lib/templates/components/layout/LcSideNav.vue'),
  LcMainLogo: () => import('~~/lib/templates/components/layout/LcMainLogo.vue'),
  LcMainToolbar: () => import('~~/lib/templates/components/layout/LcMainToolbar.vue'),
  LcMainSearch: () => import('~~/lib/templates/components/layout/LcMainSearch.vue'),
  LcPageToolbar: () => import('~~/lib/templates/components/layout/LcPageToolbar.vue')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
