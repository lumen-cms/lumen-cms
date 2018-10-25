// import Vue from 'vue'
// import Vuex from 'vuex'
import * as content from '~cms/store/content/index.js'
import * as apollo from '~cms/store/apollo/index.js'
import * as general from '~cms/store/general/index.js'

// Vue.use(Vuex)
export default (ctx) => {
  const { store } = ctx
  const storeOptions = {
    state: Object.assign(general.state, apollo.state, content.state),
    getters: Object.assign(general.getters, apollo.getters, content.getters),
    mutations: Object.assign(general.mutations, apollo.mutations, content.mutations),
    actions: Object.assign(general.actions, apollo.actions, content.actions)
  }
  // return new Vuex.Store(storeOptions)
  // app.store = store
  store.registerModule('lc', Object.assign({}, storeOptions), {
    preserveState: !!store.state.lc // important to preserve the state client/server
  })
}
