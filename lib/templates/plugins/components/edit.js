import Vue from 'vue'

const components = {
  LcEditToolbar: () => import('~~/lib/templates/components/edit/LcEditToolbar.vue').then(m => m.default || m),
}

Object.keys(components).forEach(comp => {
  Vue.component(comp, components[comp])
})
