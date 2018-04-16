/**
 * This function runs inside getHead and returns an array of meta tags. Don't forget hid for robots
 *
 * @param domain
 * @param host
 * @param path
 * @param languageKey
 * @returns {Array}
 */
export default function ({domain, host, path, languageKey}) {
  const meta = []
  // example:
  // meta.push({hid: 'robots', name: 'robots', content: 'index,follow'})
  // meta.push({hid: 'googe-site-verification', name: 'google-site-verification', content: 'YOUR_KEY'})
  return meta
}
