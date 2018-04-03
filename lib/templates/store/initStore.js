const {resolve} = require('path')

module.exports = function () {
  this.addPlugin(resolve(__dirname, './index.js'))
}
