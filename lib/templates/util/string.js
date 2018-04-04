/**
 * Returns a string with it's first character to LowerCase
 * @param {string} str
 * @returns {string}
 */
export const firstCharToLower = (str) => {
  return str && str.charAt(0).toLowerCase() + str.substring(1)
}

/**
 * Returns a string with it's first character to UpperCase^
 * @param {string} str
 * @returns {string}
 */
export const firstCharToUpper = (str) => {
  return str && str.charAt(0).toUpperCase() + str.substring(1)
}

/**
 * https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
 * @param {String} subjectString
 * @param {String} searchString
 * @param {number} [position]
 * @returns {boolean}
 */
export const endsWith = (subjectString, searchString, position) => {
  if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
    position = subjectString.length
  }
  position -= searchString.length
  const lastIndex = subjectString.indexOf(searchString, position)
  return lastIndex !== -1 && lastIndex === position
}
