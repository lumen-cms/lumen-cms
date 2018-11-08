const { resolve } = require('path')
// const resolve = (dir) => require('path').join(__dirname, dir)

module.exports = {
  rootDir: resolve(__dirname, '../../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  disableCSS: true,
  vuetify: {
    theme: {
      primary: '#ff5555',
      secondary: '#424242',
      accent: '#82B1FF',
      error: '#FF5252',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FFC107'
    }
  },
  env: {
    GRAPHQL_PROJECT_ID: 'cj8yj66xc01740164lh5bv4fz',
    GRAPHQL_SUBSCRIPTION: null, // 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo',
    COPYRIGHT: 'Lumen CMS',
    IMAGE_PROXY: 'https://imgx.studentsgoabroad.com/v1/',
    GQL_PROXY_PROD: 'https://api-static.studentsgoabroad.com/',
    GQL_PROXY_DEV: 'http://localhost:6969/',
    ENFORCE_GQL_PROXY_PROD: '1'
  },
  plugins: ['~/plugins/additionalComponents.js'],
  modules: [['@@', {
    apollo: {
      clientConfigs: {
        default: {
          httpEndpoint: 'https://api.graph.cool/simple/v1/lumen-cms-demo',
          wsEndpoint: null// 'wss://subscriptions.us-west-2.graph.cool/v1/lumen-cms-demo'
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
      },
      company: {
        name: 'Lumen Media Ptd. Ltd.',
        address: {
          postalCode: '049908',
          streetAddress: 'Bank of China Building 25',
          addressLocality: 'Singapore'
        },
        email: 'some@info.com',
        phoneNumbers: [{ value: '+63123456', text: 'Singapore: +6263123456' }]
      }
    }
  }]],
  head: {
    title: 'Studentsgoabroad',
    meta: [
      { charset: 'utf-8' },
      { hid: 'robots', name: 'robots', content: 'noindex, nofollow' },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui'
      },
      { hid: 'description', name: 'description', content: 'Studentsgoabroad project' }
    ]
  },
  css: [{ src: '~/assets/style/app.styl', lang: 'styl' }],
  build: {
    // extractCSS: true
    // optimization: {
    //   splitChunks: {
    //     name: true,
    //     maxSize: 350000
    //   }
    // }
  }
}
