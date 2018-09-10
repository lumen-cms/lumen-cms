import supportsWebP from 'supports-webp'

export default function ({req}, inject) {
  if (process.server) {
    inject('hasWebpSupport', req.headers.accept && req.headers.accept.includes('webp'))
  } else {
    inject('hasWebpSupport', supportsWebP)
  }
}
