import { parse, pick } from 'accept-language-parser'

/**
 *
 * @param req
 * @param store
 * @param params
 * @returns {{host: string, slug: *, locale: *}}
 */
export default function initialAsyncData ({ req, store, params, $cms }) {
  let locale = $cms.languages.length === 1 ? $cms.languages[0] : store.state.lc.locale
  let path = params.slug ? params.slug : params && params['0']
  if (path && $cms.languages.includes(path)) {
    locale = path
  }
  if (!path) {
    // if its root of page
    if ($cms.languages.length > 1 && process.server) {
      const acceptLangHeader = (req.headers && req.headers['accept-language']) || ''
      locale = (acceptLangHeader && pick($cms.languages, parse(acceptLangHeader))) || locale
    }
    path = locale
  }
  // remove leading slash
  path = path && path.replace(/^\/+/g, '')
  const host = req ? (req.headers.host || req.headers.referer || req.headers.referrer) : window.location.origin
  if (process.server) {
    console.log('current host:', host)
  }
  return {
    host,
    slug: path,
    locale
  }
}
