const {resolve} = require('path')
const {existsSync} = require('fs')
const _mergeWith = require('lodash.mergewith')
const cmsDefaults = require('./defaults')
const scrollBehaviour = require('./templates/util/scrollBehaviour')
const pkg = require('../package')

const defaults = {
  disableCSS: false,
  fonts: {
    roboto: 'Roboto:300,400,500,700'
  },
  cms: Object.assign({}, cmsDefaults, {
    TEMPLATE: {
      HEAD_TOP: 'HEAD_TOP',
      HEAD_EXTENSION: 'HEAD_EXTENSION',
      SIDEBAR_TOP: 'SIDEBAR_TOP',
      FOOTER_TOP: 'FOOTER_TOP',
      FOOTER_MIDDLE: 'FOOTER_MIDDLE',
      FOOTER_BOTTOM: 'FOOTER_BOTTOM',
      SIDENAV: 'SIDENAV'
    }
  }),
  components: {
    core: {},
    edit: {},
    layout: {},
    view: {}
  },
  hooks: {
    /**
     *
     */
    // initialAsyncData:({req, store, params, $cms}) => {
    //   return {
    //     host,
    //     locale,
    //     path
    //   }
    // }
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
    return objValue.concat(srcValue)
  }
}

module.exports = function (moduleOptions) {
  const userOptions = Object.keys(moduleOptions).length === 0 ? this.options['lumen-cms'] : moduleOptions
  const options = _mergeWith(defaults, userOptions, customizeMerger)
  const vuetifyOptions = this.options.vuetify || userOptions.vuetify || {}

  // notice: options.cms will be injected to nuxt as this.$cms / app.$cms
  // all other options are suitable for overwriting components

  const middlewarePath = resolve(this.options.srcDir, 'middleware/isAuth.js')
  if (!existsSync(middlewarePath)) {
    throw new Error(`[lumen-cms] Please create middleware folder and place a file called isAuth.js with following content:
  export default function ({store, redirect}) {
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
  }`)
  }

  /**
   * module section
   */
  // vuetify
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vuetify.js'),
    fileName: 'plugins.vuetify.js',
    options: vuetifyOptions
  })
  // add material icons
  this.options.head.link.push({
    rel: 'stylesheet',
    type: 'text/css',
    href: '//fonts.googleapis.com/css?family=Material+Icons'
  })
  // add vuetify cdn css
  this.options.head.link.push({
    rel: 'stylesheet',
    type: 'text/css',
    href: `https://unpkg.com/vuetify@${pkg.dependencies.vuetify}/dist/vuetify.min.css`
  })
  // apollo
  this.requireModule(['@nuxtjs/apollo', {
    clientConfigs: {
      default: resolve(__dirname, './templates/networkInterfaces/apolloConfig.js')
    },
    includeNodeModules: true
  }])

  // google analytics
  if (this.options['google-analytics']) {
    this.requireModule(['@nuxtjs/google-analytics'])
  }

  if (this.options['sitemap']) {
    this.requireModule(['@nuxtjs/sitemap'])
  }

  /**
   * add modules and plugins for $cms
   */

  // initialize $cms context
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/initialize/injectCmsVariables.js'),
    options: options.cms,
    name: 'plugins.injectCmsVariables.js'
  })
  // add vueI18n
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vueI18n.js'),
    options: options,
    name: 'plugins.vueI18n.js'
  })
  // global mixin for apollo helpers
  this.addPlugin({
    src: resolve(__dirname, './templates/mixins/apolloHelpers.js'),
    name: 'plugins.apolloHelpers.js'
  })

  /**
   * plugin section
   */
  // vue-ls for local-storage
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vueLs.js'),
    ssr: false,
    name: 'plugins.vueLs.js'
  })
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/fontLoader.js'),
    ssr: false,
    options: options.fonts,
    name: 'plugins.fontLoader.js'
  })

  // initialize store
  this.addPlugin({
    src: resolve(__dirname, './templates/store/index.js'),
    options: options,
    name: 'plugins.store.index.js'
  })
  // initialize global async components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/core.js'),
    options: options.components.core,
    name: 'plugins.components.core.js'
  })
  // initialize layout components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/layout.js'),
    options: options.components.layout,
    name: 'plugins.components.layout.js'
  })
  // initialize view components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/view.js'),
    options: options.components.view,
    name: 'plugins.components.view.js'
  })
  // initialize edit components
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/components/edit.js'),
    options: options.components.edit,
    name: 'plugins.components.edit.js'
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

    // list with alias
    options.cms.routes.list.forEach(alias => {
      routes.push({
        name: alias,
        path: '/' + alias,
        component: resolve(__dirname, './templates/pages/articleList.vue')
      })
    })

    routes.push({
      name: 'article',
      path: '/:slug*',
      component: resolve(__dirname, './templates/pages/index.vue')
    })
  })

  // fix scroll behaviour bug
  this.options.router.scrollBehaviour = scrollBehaviour

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
  })

  // add default stylesheets
  if (!options.disableCSS) {
    this.options.css.push({src: resolve(__dirname, './templates/assets/style/imports.styl'), lang: 'styl'})
  }

  // enable extractCSS
  this.options.build.extractCSS = true

  // require translations.js inside of srcDir
  const translationPath = resolve(this.options.srcDir, 'translations.js')
  if (!existsSync(translationPath)) throw new Error('[lumen-cms] Please create a translations.js file in your source folder.')

  // add to vendor
  this.addVendor(['slugify', 'vue-i18n', 'lodash.debounce', 'vuetify'])

  // make sure store exist
  if (!this.options.store) {
    throw new Error(
      '[ERR] [AUTH] ' +
      'Enable vuex store by creating `store` folder as described in https://nuxtjs.org/guide/vuex-store.'
    )
  }
}
