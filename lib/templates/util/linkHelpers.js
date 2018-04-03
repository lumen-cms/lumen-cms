/**
 *
 * @param str
 * @returns {boolean}
 */
const isExternal = (str) => {
  return (
    (str.indexOf('href="https://') !== -1) || (str.indexOf('href="http://') !== -1) ||
    (str.indexOf('href=\'https://') !== -1) || (str.indexOf('href=\'http://') !== -1)
  )
}

/**
 *
 * @param str
 * @returns {boolean}
 */
const isExternalUrl = (str) => (str.indexOf('https://') !== -1) || (str.indexOf('http://') !== -1)

/**
 *
 * @param str
 * @returns {boolean}
 */
const hasATag = (str) => str.indexOf('<a') !== -1 // && str.indexOf('href=') !== -1

export default {
  isExternal,
  isExternalUrl,
  hasATag
}
