import Vue from 'vue'

const components = {
  LcContentRenderer: () => import('~~/lib/templates/components/view/LcContentRenderer.js').then(m => m.default || m),
  LcTextImage: () => import('~~/lib/templates/components/view/LcTextImage.js').then(m => m.default || m)
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
