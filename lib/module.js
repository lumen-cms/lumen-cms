const {resolve} = require('path')
const {existsSync} = require('fs')
const cmsDefaults = require('./defaults')
const defaults = {
  pluginRoot: resolve(__dirname, './templates'),
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
    // add isAuth middleware // todo does not work... currently
    // this.addTemplate({
    //   src: resolve(__dirname, './templates/middleware/isAuth.js'),
    //   fileName: 'isAuth',
    //   options: this.options
    // })
    //
    // this.options.router.middleware.push('isAuth')
    // console.log(this.options.router)
    // require middleware folder inside of srcDir
  const middlewarePath = resolve(this.options.srcDir, 'middleware/isAuth.js')
  if (!existsSync(middlewarePath)) {
    throw new Error(`[nuxt-graphql-cms] Please create middleware folder and place a file called isAuth.js with following content:
  export default function ({store, redirect}) {
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
  }`)
  }

  /**
   * template section
   */

  /**
   * module section
   */
  // vuetify
  this.addModule(['@nuxtjs/vuetify', {}])
  // apollo
  this.addModule(['@nuxtjs/apollo', {
    clientConfigs: {
      default: resolve(__dirname, './templates/networkInterfaces/apolloConfig.js')
    }
  }])
  // add store
  this.addModule([resolve(__dirname, './templates/plugins/initialize/module.js'), {
    options: options.cms
  }])
  // add vueI18n
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vueI18n.js'),
    options: options
  })
  // global mixin for apollo helpers
  this.addPlugin({
    src: resolve(__dirname, './templates/mixins/apolloHelpers.js')
  })

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
  this.addPlugin({
    src: resolve(__dirname, './templates/store/index.js'),
    options: options
  })
  // initialize global async components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/core.js'),
    options: options
  })
  // initialize layout components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/layout.js'),
    options: options
  })
  // initialize view components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/view.js'),
    options: options
  })
// initialize edit components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/edit.js'),
    options: options
  })
  // add server middleware with basic redirects
  this.addServerMiddleware(resolve(__dirname, './templates/serverMiddleware/seoRedirects.js'))

  /**
   * layout section
   */
  // general article layout
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/pageView.vue'),
    name: 'pageView'
  })
  // error layout // todo seems not to work yet..
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/error.vue'),
    name: 'error'
  })
  // admin layout
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/admin.vue'),
    name: 'admin'
  })
  /**
   * pages section
   */
  this.extendRoutes((routes, resolve) => {
    routes.push({
      name: 'admin',
      path: '/admin',
      component: resolve(__dirname, './templates/pages/admin.vue')
    })
    routes.push({
      name: 'articleAdmin',
      path: '/admin/article-admin',
      component: resolve(__dirname, './templates/pages/articleAdmin.vue')
    })
    routes.push({
      name: 'articleEdit',
      path: '/admin/article-edit/:id?',
      component: resolve(__dirname, './templates/pages/articleEdit.vue')
    })
    routes.push({
      name: 'pageTemplates',
      path: '/admin/page-templates',
      component: resolve(__dirname, './templates/pages/pageTemplates.vue')
    })
    routes.push({
      name: 'redirects',
      path: '/admin/redirects',
      component: resolve(__dirname, './templates/pages/redirects.vue')
    })

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
    config.resolve.alias.vue = 'vue/dist/vue.esm.js'
    // config.resolve.extensions = config.resolve.extensions.concat('.graphql', '.gql')
    // config.module.rules.push({
    //   test: /\.(graphql|gql)$/,
    //   use: 'graphql-tag/loader'
    // })
  })

  // add default stylesheets
  this.options.css.push({src: resolve(__dirname, './templates/assets/style/imports.styl'), lang: 'styl'})

  // enable extractCSS
  this.options.build.extractCSS = true

  // require translations.js inside of srcDir
  const translationPath = resolve(this.options.srcDir, 'translations.js')
  if (!existsSync(translationPath)) throw new Error('[nuxt-graphql-cms] Please create a translations.js file in your source folder.')

  // add to vendor
  this.addVendor(['slugify', 'vue-i18n', 'lodash.debounce'])

  // make sure store exist
  if (!this.options.store) {
    throw new Error(
      '[ERR] [AUTH] ' +
      'Enable vuex store by creating `store/index.js`.'
    )
  }
}
