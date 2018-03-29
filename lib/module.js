const {resolve} = require('path')

module.exports = async function module (moduleOptions) {
  const options = Object.assign({}, moduleOptions)

  // this.addPlugin({
  //   src: resolve(__dirname, '../templates/plugin.js'),
  //   fileName: 'nuxt-graphql-cms.js',
  //   options
  // })


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

  /**
   * layout section
   */
  this.addLayout({
    src: resolve(__dirname, './templates/layouts/pageView.vue')
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
