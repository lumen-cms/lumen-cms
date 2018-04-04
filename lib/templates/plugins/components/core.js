import Vue from 'vue'

const components = {
  LcVueRenderer: () => import('<%= options.pluginRoot %>/components/core/LcVueRenderer.js'),
  LcHtmlRenderer: () => import('<%= options.pluginRoot %>/components/core/LcHtmlRenderer.js'),
  LcErrorWidget: () => import('<%= options.pluginRoot %>/components/core/LcErrorWidget.vue'),
  LcExpansionPanelMenu: () => import('<%= options.pluginRoot %>/components/core/navigation/LcExpansionPanelMenu.js'),
  LcExpansionPanelMenuItem: () => import('<%= options.pluginRoot %>/components/core/navigation/LcExpansionPanelMenuItem.vue')
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
