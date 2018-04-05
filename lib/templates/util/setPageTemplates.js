import allPageTemplatesGql from '../gql/pageTemplate/allPageTemplates.gql'

/**
 *
 * @param apollo
 * @param store
 * @returns {*}
 */
export default function fetchPageTemplates (apollo, store) {
  if (store.state.lc.pageTemplates.length) {
    return Promise.resolve(true)
  }
  return apollo.query({query: allPageTemplatesGql})
    .then((r) => {
      const data = r.data
      const pageTemplates = data.allPageTemplates
      return store.dispatch('setPageTemplates', pageTemplates)
    })
}
