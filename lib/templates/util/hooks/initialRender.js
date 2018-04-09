

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
