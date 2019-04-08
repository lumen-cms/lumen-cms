import supportsWebP from 'supports-webp'
import Vue from 'vue'

export default async function ({ req }) {
  if (process.server) {
    Vue.prototype.$hasWebpSupport = req.headers && req.headers.accept && req.headers.accept.includes('webp')
  } else {
    Vue.prototype.$hasWebpSupport = await supportsWebP
  }
}
