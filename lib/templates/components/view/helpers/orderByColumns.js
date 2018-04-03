/**
 * groups columns
 * @param collection
 * @returns {Array}
 */
export function groupBy (collection) {
  const obj = {}
  collection.forEach(item => {
    const prop = item.layoutIndex
    if (!obj[prop]) {
      obj[prop] = []
    }
    obj[prop].push(item)
  })
  // @TODO - check if sorting still needed
  return Object.keys(obj).sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }).map(e => obj[e])
}
