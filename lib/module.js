const {resolve} = require('path')
const {existsSync} = require('fs')
const _mergeWith = require('lodash.mergewith')
const cmsDefaults = require('./defaults')
const scrollBehaviour = require('./templates/util/scrollBehaviour')
const defaults = {
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
  componentOverwrites: {
    CmsTest: '~/components/CmsTest.vue'
  }
}

/**
 * Function prepares the modified options in the correct way.
 *
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
  console.log(moduleOptions)
  console.log(defaults)
  const options = _mergeWith(defaults, moduleOptions, customizeMerger)
  console.log('merged', options)

  // notice: options.cms will be injected to nuxt as this.$cms / app.$cms
  // all other options are suitable for overwriting components

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
    },
    includeNodeModules: true
  }])
  // initialize $cms context
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/initialize/injectCmsVariables.js'),
    options: options.cms
  })
  // this.addModule([resolve(__dirname, './templates/plugins/initialize/module.js'), {
  //   options: options.cms
  // }])
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
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/vueLs.js'),
    ssr: false
  })
  this.addPlugin({
    src: resolve(__dirname, './templates/plugins/fontLoader.js'),
    ssr: false,
    options: options.cms
  })

  // initialize store
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
      'Enable vuex store by creating `store` folder as described in https://nuxtjs.org/guide/vuex-store.'
    )
  }
}
