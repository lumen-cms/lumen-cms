const {resolve} = require('path')
const nodeExternals = require('webpack-node-externals')
// const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  env: {
    GRAPHQL_PROJECT_ID: 'cj8yj66xc01740164lh5bv4fz',
    GRAPHQL_SUBSCRIPTION: 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo',
    COPYRIGHT: 'Lumen CMS'
  },
  plugins: ['~/plugins/additionalComponents.js'],
  modules: [['@@', {
    apollo: {
      clientConfigs: {
        default: {
          httpEndpoint: 'https://api.graph.cool/simple/v1/lumen-cms-demo',
          wsEndpoint: 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo'
        }
      }
    },
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
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    extend (config, ctx) {
      // config.resolve.alias['~articleUpdate'] = resolve(__dirname, './gql/UpdateArticle.gql')
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
