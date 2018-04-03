import Vue from 'vue'

const components = {
  LcVueRenderer: () => import('~~/lib/templates/components/core/LcVueRenderer.js').then(m => m.default || m),
  LcHtmlRenderer: () => import('~~/lib/templates/components/core/LcHtmlRenderer.js').then(m => m.default || m)
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
