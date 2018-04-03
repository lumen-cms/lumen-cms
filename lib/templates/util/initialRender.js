import {parse, pick} from 'accept-language-parser'
// import CONFIG from '../../src/config'

/**
 *
 * @param req
 * @param store
 * @param params
 * @returns {{host: string, slug: *, locale: *}}
 */
export function initialRenderFunc ({req, store, params, CONFIG}) {
  let locale = store.state.lc.locale
  let path = params.slug ? params.slug : params && params['0']
  if (!path) {
    // if its root of page
    const acceptLangHeader = (req && req.headers && req.headers['accept-language']) || ''
    locale = (acceptLangHeader && pick(CONFIG.languages, parse(acceptLangHeader))) || locale
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

/**
 *
 * @param defaultLanguage
 * @param path
 * @param domain
 * @returns {*[]}
 */
export function canonicalRenderFunc ({defaultLanguage, path, domain}) {
  return path === '/' + defaultLanguage ? [{
    rel: 'canonical',
    href: domain + '/'
  }] : [{
    rel: 'canonical',
    href: domain + path
  }]
}

/**
 *
 * @param domain
 * @returns {string}
 */
export function robotsRenderFunc ({domain}) {
  return 'noindex,nofollow'
}
