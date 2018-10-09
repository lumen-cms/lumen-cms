import supportsWebP from 'supports-webp'
import Vue from 'vue'

export default function ({req}) {
  if (process.server) {
    console.log('headers for webp', req.headers)
    Vue.prototype.$hasWebpSupport = req.headers && req.headers.accept.includes('webp')
  } else {
    Vue.prototype.$hasWebpSupport = supportsWebP
  }
}
