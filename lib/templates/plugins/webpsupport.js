import supportsWebP from 'supports-webp'

export default function ({req}, inject) {
  if (process.server) {
    if (req.headers.accept) {
      const hasWebp = req.headers.accept.indexOf('webp') !== -1
      console.log('accept headers:', req.headers, hasWebp, !!hasWebp)
      inject('hasWebpSupport', hasWebp)
    } else {
      console.log('req.headers.accept not available')
    }
  } else {
    inject('hasWebpSupport', supportsWebP)
  }
}
