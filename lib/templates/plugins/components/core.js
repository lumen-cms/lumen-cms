import Vue from 'vue'

const components = {
  LcVueRenderer: () => import('~~/lib/templates/components/core/LcVueRenderer.js').then(m => m.default || m),
  LcHtmlRenderer: () => import('~~/lib/templates/components/core/LcHtmlRenderer.js').then(m => m.default || m),
  LcErrorWidget: () => import('~~/lib/templates/components/core/LcErrorWidget.vue').then(m => m.default || m),
  LcExpansionPanelMenu: () => import('~~/lib/templates/components/core/navigation/LcExpansionPanelMenu.js').then(m => m.default || m),
  LcExpansionPanelMenuItem: () => import('~~/lib/templates/components/core/navigation/LcExpansionPanelMenuItem.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
