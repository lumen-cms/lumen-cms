import Vue from 'vue'

const components = {
  LcVueRenderer: () => import('<%= options.pluginRoot %>/components/core/LcVueRenderer.js').then(m => m.default || m),
  LcHtmlRenderer: () => import('<%= options.pluginRoot %>/components/core/LcHtmlRenderer.js').then(m => m.default || m),
  LcErrorWidget: () => import('<%= options.pluginRoot %>/components/core/LcErrorWidget.vue').then(m => m.default || m),
  LcExpansionPanelMenu: () => import('<%= options.pluginRoot %>/components/core/navigation/LcExpansionPanelMenu.js').then(m => m.default || m),
  LcExpansionPanelMenuItem: () => import('<%= options.pluginRoot %>/components/core/navigation/LcExpansionPanelMenuItem.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
