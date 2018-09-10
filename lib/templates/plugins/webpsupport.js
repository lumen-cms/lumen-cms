import supportsWebP from 'supports-webp'

export default function ({req}, inject) {
  if (process.server) {
    if (req.headers.accept) {
      inject('hasWebpSupport', req.headers.accept.includes('webp'))
    } else {
      console.log('req.headers.accept not available')
    }
  } else {
    inject('hasWebpSupport', supportsWebP)
  }
}
