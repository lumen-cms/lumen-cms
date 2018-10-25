/**
 *
 * @param defaultLanguage
 * @param path
 * @param domain
 * @returns {*[]}
 */
export default function getCanonical ({ defaultLanguage, path, domain }) {
  return path === '/' + defaultLanguage ? [{
    rel: 'canonical',
    href: domain + '/'
  }] : [{
    rel: 'canonical',
    href: domain + path
  }]
}
