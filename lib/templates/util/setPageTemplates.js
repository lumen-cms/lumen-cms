import allPageTemplatesGql from '../gql/pageTemplate/allPageTemplates.gql'

/**
 * sets all pageTemplates
 * @param apollo
 * @param store
 * @returns {Promise<*>}
 */
export default async function setPageTemplates (apollo, store) {
  // if (store.state.lc.pageTemplates.length) {
  //   return Promise.resolve()
  // }
  const {data} = await apollo.query({query: allPageTemplatesGql})
  const pageTemplates = data.allPageTemplates
  return store.dispatch('setPageTemplates', pageTemplates)
}
