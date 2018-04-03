// import Vue from 'vue'
import Vuex from 'vuex'
import * as content from '~~/lib/templates/store/content/index.js'
import * as apollo from '~~/lib/templates/store/apollo/index.js'
import * as general from '~~/lib/templates/store/general/index.js'

// Vue.use(Vuex)
export default (ctx) => {
  const {app, store} = ctx
  const storeOptions = {
    state: Object.assign(general.state, apollo.state, content.state),
    getters: Object.assign(general.getters, apollo.getters, content.getters),
    mutations: Object.assign(general.mutations, apollo.mutations, content.mutations),
    actions: Object.assign(general.actions, apollo.actions, content.actions)
  }
  // return new Vuex.Store(storeOptions)
  // app.store = store
  console.log('inside plugin', ctx.$cms, ctx.cms, app.$cms, app.cms)
  store.registerModule('lc', Object.assign({}, storeOptions, {namespaced: true}))
}
