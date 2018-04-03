const {resolve} = require('path')
const cmsDefaults = require('./defaults')
const defaults = {
  cms: cmsDefaults,
  componentOverwrites: {
    CmsTest: '~/components/CmsTest.vue'
  }
}
module.exports = function (moduleOptions) {
  const options = Object.assign({}, defaults, moduleOptions)

  // todo
  // add vendor for slugify

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
      default: resolve(__dirname, './templates/networkInterfaces/apolloConfig.js')
    }
  }])
  // add store
  this.requireModule([resolve(__dirname, './templates/plugins/initialize/module.js'), {
    options: options.cms
  }])

  /**
   * plugin section
   */
  // vue-ls for local-storage
  this.addPlugin({src: resolve(__dirname, './templates/plugins/vueLs.js'), ssr: false})
  // inject cms variables
  // this.addPlugin({
  //   src: resolve(__dirname, './templates/plugins/injectCmsVariables.js'),
  //   options: options.cms
  // })
  this.addPlugin(resolve(__dirname, './templates/store/index.js'))

  // initialize global async components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/layout.js'),
    options: options.componentOverwrites
  })
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

  // make sure store exist
  if (!this.options.store) {
    throw new Error(
      '[ERR] [AUTH] ' +
      'Enable vuex store by creating `store/index.js`.'
    )
  }
}
