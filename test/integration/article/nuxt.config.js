const {resolve} = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  // env: {
  //   GRAPHQL_PROJECT_ID: 'cj8yj66xc01740164lh5bv4fz',
  //   GRAPHQL_SUBSRIPTION: 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo'
  // },
  env: {
    GRAPHQL_PROJECT_ID: 'cjfw4xfis12es01400sgtq2a0',
    GRAPHQL_SUBSRIPTION: 'wss://subscriptions.graph.cool/v1/praktikumsanzeigen',
    COPYRIGHT: 'Lumen CMS'
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
