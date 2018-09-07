import supportsWebP from 'supports-webp'

export default function (_, inject) {
  inject('hasWebpSupport', supportsWebP)
}
