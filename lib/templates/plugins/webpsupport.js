import supportsWebP from 'supports-webp'
import Vue from 'vue'

export default function ({req}) {
  if (process.server) {
    Vue.prototype.$hasWebpSupport = req.headers.accept.includes('webp')
  } else {
    Vue.prototype.$hasWebpSupport = supportsWebP
  }
}
