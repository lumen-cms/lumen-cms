const {resolve} = require('path')
const defaults = {
  cms: {
    test: 'test',
    meta: {
      hallo: {
        test: 'hier'
      }
    }
  },
  componentOverwrites: {
    CmsTest: '~/components/CmsTest.vue'
  }
}
module.exports = function (moduleOptions) {
  const options = Object.assign({}, defaults, moduleOptions)

  // this.addPlugin({
  //   src: resolve(__dirname, '../templates/plugin.js'),
  //   fileName: 'nuxt-graphql-cms.js',
  //   options
  // })

  /**
   * add middleware example from https://github.com/nuxt-community/nuxt-i18n/blob/develop/lib/module.js
   */
  // Middleware
  // this.addTemplate({
  //   src: resolve(__dirname, './templates/i18n.routing.middleware.js'),
  //   fileName: 'i18n.routing.middleware.js',
  //   options
  // })
  // this.options.router.middleware.push('i18n')

  /**
   * template section
   */

  /**
   * module section
   */
  // vuetify
  this.requireModule(['@nuxtjs/vuetify', {}])
  // apollo
  this.requireModule(['@nuxtjs/apollo', {
    clientConfigs: {
      default: resolve(__dirname, './templates/network-interfaces/apollo-config.js')
    }
  }])

  /**
   * plugin section
   */
  // vue-ls for local-storage
  this.addPlugin({src: resolve(__dirname, './templates/plugins/vueLs.js'), ssr: false})
  // inject cms pro
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/injectCmsVariables.js'),
    options: options.cms
  })
  // initialize global async components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/loadComponents.js'),
    options: options.componentOverwrites
  })

  /**
   * layout section
   */
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/pageView.vue'),
    name: 'layouts/pageView'
  })

  /**
   * pages section
   */
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'article',
      path: '/:slug*',
      component: resolve(__dirname, './templates/pages/index.vue')
    })
  })
}
