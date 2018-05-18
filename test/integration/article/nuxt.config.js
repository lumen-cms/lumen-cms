const {resolve} = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  env: {
    // GRAPHQL_PROJECT_ID: 'cj8yj66xc01740164lh5bv4fz',
    GRAPHQL_PROJECT_ID: 'cjfw4xfis12es01400sgtq2a0',
    // GRAPHQL_SUBSCRIPTION: 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo',
    GRAPHQL_SUBSCRIPTION: 'wss://subscriptions.graph.cool/v1/praktikumsanzeigen',
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
      },
      systemBar: {
        enable: true,
        dark: false,
        color: 'white'
      },
      templateVisibility: {
        SIDEBAR_LEFT: 'test'
        // HEAD_TOP (context) {
        //   console.log(context)
        //   return true
        // }
      }
    }
  }]],
  head: {
    title: 'Studentsgoabroad',
    meta: [
      {charset: 'utf-8'},
      {hid: 'robots', name: 'robots', content: 'noindex, nofollow'},
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      {hid: 'description', name: 'description', content: 'Studentsgoabroad project'}
    ]
  },
  build: {
    extend (config) {
      // config.resolve.alias['~articleUpdate'] = resolve(__dirname, './gql/UpdateArticle.gql')
    }
  }
}
