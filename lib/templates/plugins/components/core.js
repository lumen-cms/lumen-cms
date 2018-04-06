import Vue from 'vue'

const components = {
  LcVueRenderer: () => import('~cms/components/core/LcVueRenderer.js'),
  LcHtmlRenderer: () => import('~cms/components/core/LcHtmlRenderer.js'),
  LcExpansionPanelMenu: () => import('~cms/components/core/navigation/LcExpansionPanelMenu.js').then(),
  LcExpansionPanelMenuItem: () => import('~cms/components/core/navigation/LcExpansionPanelMenuItem')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import('<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
