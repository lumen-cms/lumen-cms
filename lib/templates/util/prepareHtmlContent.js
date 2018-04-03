/**
 * @description adds missing p tags to any text
 * @param {string} innerHTML
 * @returns {string|*}
 */
export default function (innerHTML) {
  if (!innerHTML) return
  let splitted = innerHTML.split('\n')
  // check if any wrapping tag exist, if not add p tag
  splitted = splitted.map(e => (e.length > 1 && e.charAt(0) !== '<') ? `<p>${e}</p>` : e)
  innerHTML = splitted.join('')
  return innerHTML
}
