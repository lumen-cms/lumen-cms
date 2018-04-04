/**
 * @description Provide any Page,Article or Content and clean it for being able to clone it
 *
 * @param obj
 * @returns {{}}
 */
const cleanSchemaForClone = function (obj, CONFIG) {
  const o = {}
  Object.keys(obj).forEach(key => {
    const keyToConvert = CONFIG.propertyToIdConversion.find(e => e.key === key)
    if (!obj[key]) return // ignore empty values
    if (['id', '__typename', 'parent', 'defaultLanguage', 'additionalLanguages'].includes(key)) {
      // don't include id and __typename for clone
    } else if (keyToConvert) {
      // convert nested object or array to mapped ID
      if (keyToConvert.plural) {
        o[key + 'Ids'] = obj[key].map(e => e.id)
      } else {
        o[key + 'Id'] = obj[key].id
      }
    } else if (obj[key] && obj[key].constructor === Object) {
      // recursive call the function again
      o[key] = cleanSchemaForClone(obj[key], CONFIG)
    } else if (obj[key] && obj[key].constructor === Array) {
      // map array with cleaned function
      o[key] = obj[key].map(item => {
        // in case of array either walk the object or return the primitives
        return item.constructor === Object ? cleanSchemaForClone(item, CONFIG) : item
      })
    } else {
      // for strings just append the key
      o[key] = obj[key]
    }
  })
  return o
}

export {cleanSchemaForClone}
