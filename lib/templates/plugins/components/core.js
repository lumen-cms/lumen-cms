import Vue from 'vue'

const components = {
  LcVueRenderer: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/LcVueRenderer.js'),
  LcHtmlRenderer: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/LcHtmlRenderer.js'),
  LcExpansionPanelMenu: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/navigation/LcExpansionPanelMenu.js'),
  LcExpansionPanelMenuItem: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/navigation/LcExpansionPanelMenuItem'),
  LcToolbarMenu: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/navigation/LcToolbarMenu.js'),
  LcToolbarMenuItem: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/navigation/LcToolbarMenuItem'),
  LcColumnsMenu: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/navigation/LcColumnsMenu.js'),
  LcColumnsMenuItem: () => import(/* webpackChunkName: 'content-chunk' */ '~cms/components/core/navigation/LcColumnsMenuItem')
}

  <% Object.keys(options).forEach((key) => {%>
    components['<%= key %>'] = () => import(/* webpackChunkName: 'content-chunk' */ '<%= options[key] %>')
  <% }) %>

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
