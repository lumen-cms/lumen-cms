import backgroundContainer from '../partials/backgroundContainer'

/**
 *
 * @param {function} h - the createElement function
 * @param {array} items
 * @param {array} [classNamesBg]
 * @param {object} [additionalProps]
 * @returns {array}
 */
export default (h, items, backgroundClassNames, additionalProps) => {
  if ((backgroundClassNames && backgroundClassNames.length) || additionalProps) {
    const props = Object.assign({}, {backgroundClassNames}, additionalProps || {})
    items.unshift(h(backgroundContainer, {props}))
  }
  return items
}
