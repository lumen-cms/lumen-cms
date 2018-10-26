/**
 *
 * @param apollo
 * @param store
 * @returns {*}
 */
export default function fetchPageTemplates (apollo, store) {
  const locale = store.state.lc.locale.toUpperCase()
  if (store.state.lc.pageTemplates.length && store.state.lc.pageTemplates[0].languageKey === locale) {
    return Promise.resolve(true)
  }
  const server = process.env.NODE_ENV !== 'development' ? 'https://api.studentsgoabroad.com/' : 'http://localhost:6969/'
  const url = `${server}pageTemplate/${process.env.GRAPHQL_PROJECT_ID}?locale=${locale}`

  return fetch(url).then(r => r.json())
    .then((r) => {
      // const data = r.data
      // const pageTemplates = data.allPageTemplates
      const pageTemplates = r.allPageTemplates
      return store.dispatch('setPageTemplates', pageTemplates)
    })
}
