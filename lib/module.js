const scrollToTopBehaviour = require('./templates/util/scrollToTopBehaviour')
const {resolve, join} = require('path')
const {existsSync} = require('fs')
const _mergeWith = require('lodash.mergewith')
const cmsDefaults = require('./defaults')

const defaults = {
  disableCSS: false, // if true set set in styl @require '~lumen-cms/lib/templates/assets/style/imports.styl'
  disableVuetifyCSS: false, // if true set in styl @require '~vuetify/src/stylus/main.styl'
  cms: Object.assign(cmsDefaults),
  // overwrite paths of components
  components: {
    core: {},
    edit: {},
    layout: {},
    view: {}
  },
  pages: {}, // overwrite paths of the routes/pages
  fonts: {
    roboto: 'Roboto:300,400,500,700',
    materialIcons: 'Material+Icons'
  }
}

/**
 * Function prepares the modified options in the correct way.
 * TODO need to cover all merge use-cases. sometimes array merge, sometimes array overwrites etc.
 * @param objValue
 * @param srcValue
 * @param key
 * @param object
 * @param source
 * @param stack
 * @returns {Buffer | * | T[] | string}
 */
function customizeMerger (objValue, srcValue, key, object, source, stack) {
  // todo make sure to only merge certain arrays together..
  if (Array.isArray(objValue)) {
    if (key === 'languages') {
      return srcValue
    }
    return objValue.concat(srcValue)
  }
}

module.exports = function (moduleOptions) {
  const userOptions = Object.keys(moduleOptions).length === 0 ? this.options['lumen-cms'] : moduleOptions
  const options = _mergeWith(defaults, userOptions, customizeMerger)
  const vuetifyOptions = (this.options && this.options.vuetify) || (userOptions && userOptions.vuetify) || {}

  /**
   * add modules and plugins for $cms
   */
  this.addPlugin({
    type: 'text/javascript',
    src: resolve(__dirname, './templates/plugins/lazysizes.js'),
    fileName: join('lumen-cms', 'plugins.lazysizes.js'),
    ssr: false
  })
  /**
   * module section
   */
  // vuetify
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vuetify.js'),
    fileName: join('lumen-cms', 'plugins.vuetify.js'),
    options: vuetifyOptions
  })

  // apollo
  if (options.apollo) {
    this.requireModule(['@nuxtjs/apollo', Object.assign({}, options.apollo, {
      includeNodeModules: true
    })])
  }
  // device detection
  this.requireModule(['nuxt-device-detect'])

  if (this.options['sitemap']) {
    this.requireModule(['@nuxtjs/sitemap'])
  }

  // initialize $cms context
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/initialize/injectCmsVariables.js'),
    options: options.cms,
    fileName: join('lumen-cms', 'plugins.injectCmsVariables.js')
  })

  // global mixin for apollo helpers
  this.addPlugin({
    src: resolve(__dirname, './templates/mixins/apolloHelpers.js'),
    fileName: join('lumen-cms', 'plugins.apolloHelpers.js')
  })

  /**
   * plugin section
   */
  // vue-ls for local-storage
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vueLs.js'),
    ssr: false,
    fileName: join('lumen-cms', 'plugins.vueLs.js')
  })

  // font-loader
  // this.addPlugin({
  //   src: resolve(__dirname, './templates/plugins/fontLoader.js'),
  //   ssr: false,
  //   options: Object.assign({}, options, {
  //     vuetifyVersion: pkg.dependencies.vuetify
  //   }),
  //   fileName: join('lumen-cms', 'plugins.fontLoader.js')
  // })

  // add font loading
  const currentFonts = 'https://fonts.googleapis.com/css?family=' + Object.keys(options.fonts).map(i => options.fonts[i]).filter(e => e).join('|')
  this.options.head.link.push({href: currentFonts, rel: 'stylesheet', type: 'text/css'})

  // initialize store
  this.addPlugin({
    src: resolve(__dirname, './templates/store/index.js'),
    options: options,
    fileName: join('lumen-cms', 'plugins.store.index.js')
  })
  // initialize global async components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/core.js'),
    options: options.components.core,
    fileName: join('lumen-cms', 'plugins.components.core.js')
  })
  // initialize layout components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/layout.js'),
    options: options.components.layout,
    fileName: join('lumen-cms', 'plugins.components.layout.js')
  })
  // initialize view components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/view.js'),
    options: options.components.view,
    fileName: join('lumen-cms', 'plugins.components.view.js')
  })
  // initialize edit components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/edit.js'),
    options: options.components.edit,
    fileName: join('lumen-cms', 'plugins.components.edit.js')
  })
  /**
   * add serverMiddleware
   */
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
  // admin layout
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/admin.vue'),
    name: 'admin'
  })
  // list layout
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/list.vue'),
    name: 'list'
  })

  /**
   * pages section
   */
  this.extendRoutes((routes, resolve) => {
    const routePaths = Object.assign({
      admin: resolve(__dirname, './templates/pages/admin.vue'),
      install: resolve(__dirname, './templates/pages/install.vue'),
      articleAdmin: resolve(__dirname, './templates/pages/articleAdmin.vue'),
      articleEdit: resolve(__dirname, './templates/pages/articleEdit.vue'),
      pageTemplates: resolve(__dirname, './templates/pages/pageTemplates.vue'),
      redirects: resolve(__dirname, './templates/pages/redirects.vue'),
      articleList: resolve(__dirname, './templates/pages/articleList.vue'),
      index: resolve(__dirname, './templates/pages/index.vue')
    }, options.pages)
    routes.push({
      name: 'admin',
      path: '/admin',
      component: routePaths.admin
    })
    routes.push({
      name: 'install',
      path: '/admin/install',
      component: routePaths.install
    })
    routes.push({
      name: 'articleAdmin',
      path: '/admin/article-admin',
      component: routePaths.articleAdmin
    })
    routes.push({
      name: 'articleEdit',
      path: '/admin/article-edit/:id?',
      component: routePaths.articleEdit
    })
    routes.push({
      name: 'pageTemplates',
      path: '/admin/page-templates',
      component: routePaths.pageTemplates
    })
    routes.push({
      name: 'redirects',
      path: '/admin/redirects',
      component: routePaths.redirects
    })

    // list with alias
    options.cms.routes.list.forEach(alias => {
      routes.push({
        name: alias,
        path: '/' + alias,
        component: routePaths.articleList
      })
    })

    routes.push({
      name: 'article',
      path: '/:slug*',
      component: routePaths.index
    })
  })

  // fix scroll behaviour bug
  // this.options.router.scrollBehaviour = scrollBehaviour // todo does not work...

  // core auth middleware initialization to set token and user
  this.addPlugin({
    src: resolve(__dirname, './templates/middleware/auth.plugin.js'),
    fileName: join('lumen-cms', 'authPlugin.js'),
    options
  })
  // Middleware
  this.addTemplate({
    src: resolve(__dirname, './templates/middleware/auth.middleware.js'),
    fileName: join('lumen-cms', 'auth.js'),
    options
  })
  this.options.router.middleware.push('auth')

  // Routing plugin to protect pages which require authentication
  this.addPlugin({
    src: resolve(__dirname, './templates/middleware/isAuth.plugin.js'),
    fileName: join('lumen-cms', 'isAuthPlugin.js'),
    options
  })
  this.addTemplate({
    src: resolve(__dirname, './templates/middleware/isAuth.middleware.js'),
    fileName: join('lumen-cms', 'isAuth.js'),
    options
  })

  // add vuetify css
  if (!options.disableVuetifyCSS) {
    this.options.css.push({
      src: 'vuetify/dist/vuetify.css'
    })
  }

  // add default stylesheets
  if (!options.disableCSS) {
    this.options.css.push({
      src: resolve(__dirname, './templates/assets/style/imports.styl'),
      lang: 'styl'
    })
  }

  // enable extractCSS
  this.options.build.extractCSS = options.extractCSS

  // add vueI18n
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vueI18n.js'),
    options: options,
    fileName: join('lumen-cms', 'plugins.vueI18n.js')
  })

  // scrollToTop behaviour
  this.options.router = this.options.router || {}
  this.options.router.scrollBehavior = scrollToTopBehaviour

  // require translations.js inside of srcDir
  const translationPath = resolve(this.options.srcDir, 'translations.js')
  if (!existsSync(translationPath)) throw new Error('[lumen-cms] Please create a translations.js file in your source folder.')

  // add to vendor
  this.addVendor(['slugify', 'vue-i18n', 'lodash.debounce', 'vuetify'])

  // default build extend for vue.esm for html render
  this.extendBuild((config, {isDev, isClient}) => {
    if (isDev && isClient) {
      config.devtool = 'eval-source-map'
    }
    config.resolve.alias.vue = 'vue/dist/vue.esm.js'
    config.resolve.alias['~cms'] = resolve(__dirname, './templates')
    // next gql alias files can be overwritten in nuxt.config build section
    config.resolve.alias['~updateArticle'] = config.resolve.alias['~updateArticle'] || resolve(__dirname, './templates/gql/article/updateArticle.gql')
    config.resolve.alias['~createArticle'] = config.resolve.alias['~createArticle'] || resolve(__dirname, './templates/gql/article/createArticle.gql')
    config.resolve.alias['~extendedArticleFragment'] = config.resolve.alias['~extendedArticleFragment'] || resolve(__dirname, './templates/gql/article/extendedArticleFragment.gql')
    config.resolve.alias['~createMedia'] = config.resolve.alias['~createMedia'] || resolve(__dirname, './templates/gql/media/createMedia.gql')
    // hooks for data render and setup
    config.resolve.alias['~initialAsyncData'] = config.resolve.alias['~initialAsyncData'] || resolve(__dirname, './templates/util/hooks/initialAsyncData.js')
    config.resolve.alias['~getCanonical'] = config.resolve.alias['~getCanonical'] || resolve(__dirname, './templates/util/hooks/getCanonical.js')
    config.resolve.alias['~getMeta'] = config.resolve.alias['~getMeta'] || resolve(__dirname, './templates/util/hooks/getMeta.js')
    // extend pre-defined content element options
    config.resolve.alias['~predefinedStyles'] = config.resolve.alias['~predefinedStyles'] || resolve(__dirname, './templates/util/contentElementStylePresets.js')
  })

  // make sure store exist
  if (!this.options.store) {
    throw new Error(
      '[ERR] [AUTH] ' +
      'Enable vuex store by creating `store` folder as described in https://nuxtjs.org/guide/vuex-store.'
    )
  }
}
