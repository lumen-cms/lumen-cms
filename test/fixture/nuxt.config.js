const {resolve} = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: ['@@'],
  env: {
    GRAPHQL_ALIAS: 'lumen-cms-demo',
    GRAPH_FILE_API: 'cj8yj66xc01740164lh5bv4fz',
    GRAPHQL_SUBSCRIPTION: 'subscriptions.us-west-2.graph.cool'
  }
}
