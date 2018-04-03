// import Vue from 'vue'
import Vuex from 'vuex'
import * as content from '~~/lib/templates/store/content/index.js'
import * as apollo from '~~/lib/templates/store/apollo/index.js'
import * as general from '~~/lib/templates/store/general/index.js'

// Vue.use(Vuex)
export default ({app}) => {
  return new Vuex.Store({
    state: Object.assign(general.state, apollo.state, content.state),
    getters: Object.assign(general.getters, apollo.getters, content.getters),
    mutations: Object.assign(general.mutations, apollo.mutations, content.mutations),
    actions: Object.assign(general.actions, apollo.actions, content.actions)
  })
  // app.store = store
}
