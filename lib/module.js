const {resolve} = require('path')
const {existsSync} = require('fs')
const cmsDefaults = require('./defaults')
const defaults = {
  cms: cmsDefaults,
  componentOverwrites: {
    CmsTest: '~/components/CmsTest.vue'
  }
}
module.exports = function (moduleOptions) {
  const options = Object.assign({}, defaults, moduleOptions)

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
  this.addPlugin(resolve(__dirname, './templates/plugins/vueI18n.js'))

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
  // initialize store
  // Do this after all modules where ready
  this.addPlugin(resolve(__dirname, './templates/store/index.js'))

  // initialize global async components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/core.js'),
    options: options.componentOverwrites
  })
  // initialize layout components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/layout.js'),
    options: options.componentOverwrites
  })
  // initialize view components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/view.js'),
    options: options.componentOverwrites
  })

  // add server middleware with basic redirects
  this.addServerMiddleware(resolve(__dirname, './templates/serverMiddleware/seoRedirects.js'))

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

  // default build extend for vue.esm for html render
  this.extendBuild((config, {isDev, isClient}) => {
    if (isDev && isClient) {
      config.devtool = 'eval-source-map'
    }
    config.resolve.alias.vue = resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
  })

  // add default stylesheets
  this.options.css.push({src: resolve(__dirname, './templates/assets/style/imports.styl'), lang: 'styl'})

  // enable extractCSS
  this.options.build.extractCSS = true

  // require translations.js inside of srcDir
  const translationPath = resolve(this.options.srcDir, 'translations.js')
  if (!existsSync(translationPath)) throw new Error('[nuxt-graphql-cms] Please create a translations.js file in your source folder.')

  // add to vendor
  this.addVendor('slugify')

  // make sure store exist
  if (!this.options.store) {
    throw new Error(
      '[ERR] [AUTH] ' +
      'Enable vuex store by creating `store/index.js`.'
    )
  }
}
