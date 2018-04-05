import Vue from 'vue'

const components = {
  LcVueRenderer: () => import('~cms/components/core/LcVueRenderer.js'),
  LcHtmlRenderer: () => import('~cms/components/core/LcHtmlRenderer.js'),
  LcErrorWidget: () => import('~cms/components/core/LcErrorWidget.vue'),
  LcExpansionPanelMenu: () => import('~cms/components/core/navigation/LcExpansionPanelMenu.js'),
  LcExpansionPanelMenuItem: () => import('~cms/components/core/navigation/LcExpansionPanelMenuItem.vue')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
