import Vue from 'vue'

Vue.mixin({
  methods: {
    fetchMoreGql (queryName, variables) {
      this.$store.dispatch('fetchMoreGql', {$apollo: this.$apollo, queryName, variables})
    },

    /**
     *
     * @param queryName
     */
    refetchGql (queryName) {
      this.$store.dispatch('refetchGql', {$apollo: this.$apollo, queryName})
    },

    /**
     *
     * @param {object} queryOptions
     * @property {string} queryOptions.query
     * @property {object} queryOptions.variables
     * @param {string} [queryName]
     * @returns {Promise.<*>}
     */
    async queryGql (queryOptions, queryName) {
      return this.$store.dispatch('queryGql', {$apollo: this.$apollo, queryOptions, queryName})
    },

    /**
     * @description update any gql. In case you add mutationName then vuex state of update/add/delete will be triggered
     *
     * @param {object} mutationOptions
     * @property {string} mutationOptions.mutation
     * @property {object} mutationOptions.variables
     * @property {Array} [mutationOptions.refetchQueries]
     * @property {function} mutationOptions.update
     * @property {function} mutationOptions.updateQueries
     * @property {object} mutationOptions.optimisticResponse
     * @param {string} [mutationName]
     * @property {string} updateOptimistic.query required property of the query to update
     * @property {string} updateOptimistic.typename required property of the schema typename to update
     * @returns {Promise.<*>}
     */
    mutateGql (mutationOptions, mutationName) {
      return this.$store.dispatch('mutateGql', {$apollo: this.$apollo, mutationOptions, mutationName})
    }
  }
})
