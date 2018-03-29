import Vue from 'vue'
import VueStorage from 'vue-ls'

const options = {
  namespace: 'nuxt_graphql_cms',
  storage: 'local'
}
Vue.use(VueStorage, options)
