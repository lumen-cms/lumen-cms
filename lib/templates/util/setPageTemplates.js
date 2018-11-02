/**
 *
 * @param [store]
 * @param [lang]
 * @param [storePageTemplates]
 * @returns {Promise<*>}
 */
export default async function fetchPageTemplates (store, lang, storePageTemplates) {
  const locale = (lang || store.state.lc.locale).toUpperCase()
  const templates = storePageTemplates || ((store && store.state.lc.pageTemplates) || [])
  if (templates.length && templates[0].languageKey.toUpperCase() === locale) {
    return Promise.resolve(true)
  }
  const server = process.env.NODE_ENV !== 'development' ? 'https://api.studentsgoabroad.com/' : 'http://localhost:6969/'
  const url = `${server}pageTemplate/${process.env.GRAPHQL_PROJECT_ID}?locale=${locale}`

  return fetch(url).then(r => r.json())
    .then(async (r) => {
      const pageTemplates = r.allPageTemplates
      await store.dispatch('setPageTemplates', pageTemplates)
      return Promise.resolve(true)
    })
}
