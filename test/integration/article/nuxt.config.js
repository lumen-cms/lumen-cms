const {resolve} = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  env: {
    GRAPHQL_ALIAS: 'lumen-cms-demo',
    GRAPH_FILE_API: 'cj8yj66xc01740164lh5bv4fz',
    GRAPHQL_SUBSRIPTION: 'subscriptions.us-west-2.graph.cool'
  },
  // env: {
  //   GRAPHQL_ALIAS: 'students-admin',
  //   GRAPHQL_SUBSRIPTION: 'subscriptions.graph.cool',
  //   GRAPH_FILE_API: 'ciwyoxmas3amt0129hec6zpvl',
  //   COPYRIGHT: 'studentsgoabroad.com'
  // },
  modules: [['@@', {
    cms: {
      pageToolbarExtension: false
    }
  }]]
}
