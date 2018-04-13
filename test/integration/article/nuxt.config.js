const {resolve} = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  env: {
    GRAPHQL_PROJECT_ID: 'cj8yj66xc01740164lh5bv4fz',
    GRAPHQL_SUBSCRIPTION: 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo'
  },
  plugins: ['~/plugins/additionalComponents.js'],
  modules: [['@@', {
    cms: {
      pageToolbarExtension: false,
      componentMapping: {
        'CmsTest': {
          name: 'lc-divider-edit',
          icon: 'clear',
          text: 'Cms Test',
          view: 'lc-cms-test'
        }
      }
    }
  }]],
  build: {
    extend (config) {
      // config.resolve.alias['~articleUpdate'] = resolve(__dirname, './gql/UpdateArticle.gql')
    }
  }
}
