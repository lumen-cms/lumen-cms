const {resolve} = require('path')

module.exports = function (moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, './injectCmsVariables.js'),
    options: moduleOptions.options
  })
}
