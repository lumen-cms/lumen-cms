import {slugifyTemplateKey} from '../../util/slugifyHelpers'

export const state = {
  filter: {},
  loading: true,
  error: null,
  updating: false,
  canSave: false,
  dirty: null,
  triggerSave: false,
  deleting: false,
  mediaDeleting: false,
  pageTemplates: [],
  pageProps: {articleId: null, id: null, languageKey: null}
}
export const stateInit = [
  'allArticles', 'Article', 'allPages', 'Page', 'allUrlAliases'
]

for (const element of stateInit) {
  state[element] = {}
}

export const mutations = {
  SET_SINGLE_ITEM (state, {stateName, element}) {
    state[stateName] = element
  },
  SET_UPDATING (state, isUpdating) {
    state.updating = isUpdating
  },
  SET_CAN_SAVE (state, canSave) {
    state.canSave = canSave
  },
  SET_DIRTY_STATE (state, dirty) {
    state.dirty = dirty
  },
  SET_TRIGGER_SAVE (state, save) {
    state.triggerSave = save
  },
  SET_DELETING (state, payload) {
    state.deleting = payload
  },
  SET_MEDIA_DELETING (state, payload) {
    state.mediaDeleting = payload
  },
  SET_PAGE_PROPS (state, payload) {
    state.pageProps = payload
  },
  SET_PAGE_TEMPLATES (state, payload) {
    state.pageTemplates = payload
  }
}

export const getters = {
  getPageTemplate: (state) => (section) => {
    const slugifiedTemplateString = slugifyTemplateKey(section, state.locale)
    const findTempl = state.pageTemplates.find(e => e.key === slugifiedTemplateString)
    if (!findTempl) {
      return null
    }
    return findTempl
  },
  /**
   *
   * @param state
   */
  getErrors (state) {
    const error = state.error && JSON.parse(state.error)
    const errors = error && error.graphQLErrors
    if (errors && errors.length) {
      return errors.map(e => {
        return `path: ${e.path}, code: ${e.code}, message: ${e.message}, requestId: ${e.requestId}`
      }).join(', ')
    }
    return null
  }
}

export const actions = {

  setPageTemplates ({commit}, payload) {
    return Promise.resolve(commit('SET_PAGE_TEMPLATES', payload))
  },

  setPageProps ({commit, state}, payload) {
    commit('SET_PAGE_PROPS', payload)
  },
  /**
   *
   * @param commit
   * @param payload
   */
  triggerSave ({commit}, payload) {
    commit('SET_TRIGGER_SAVE', payload)
  },
  /**
   *
   * @param commit
   * @param payload
   */
  setCanSave ({commit}, payload) {
    commit('SET_CAN_SAVE', payload)
  },
  /**
   *
   * @param commit
   * @param payload
   */
  setDirtyState ({commit}, payload) {
    commit('SET_DIRTY_STATE', payload)
  },
  /**
   *
   * @param commit
   * @param payload
   */
  setUpdating ({commit}, payload) {
    commit('SET_UPDATING', payload)
  },
  setDeleting ({commit}, payload) {
    commit('SET_DELETING', payload)
  },
  setSingleItem ({commit}, payload) {
    commit('SET_SINGLE_ITEM', payload)
  },
  fetchMoreGql ({commit}, {$apollo, queryName, variables}) {
    $apollo.queries && $apollo.queries[queryName] && $apollo.queries[queryName].fetchMore({
      // New variables
      variables,
      // Transform the previous result with new data
      updateQuery: (previousResult, {fetchMoreResult}) => {
        const obj = {}
        Object.keys(previousResult).forEach(key => {
          if (previousResult[key].constructor === Array && fetchMoreResult[key].constructor === Array) {
            obj[key] = [...previousResult[key], ...fetchMoreResult[key]]
          } else {
            obj[key] = fetchMoreResult[key]
          }
        })
        return obj
      }
    })
  },
  refetchGql ({dispatch}, {$apollo, queryName}) {
    $apollo.queries[queryName] && $apollo.queries[queryName].refetch()
  },
  async queryGql ({dispatch}, {$apollo, queryOptions, queryName}) {
    try {
      const {data} = await $apollo.query(queryOptions)
      return queryName ? data[queryName] : data
    } catch (e) {
      console.error(e)
      dispatch('setError', JSON.stringify(e))
    }
  },
  async mutateGql ({dispatch}, {$apollo, mutationOptions, mutationName, updateOptimistic}) {
    let vuexUpdating
    if (mutationName) {
      vuexUpdating = 'setUpdating'
    }
    if (mutationName && mutationName.indexOf('delete') !== -1) {
      vuexUpdating = 'setDeleting'
    }
    if (updateOptimistic) {
      if (!updateOptimistic.query || !updateOptimistic.typename) {
        console.warn('some updateOptimistic fields missing', updateOptimistic)
      }
      // todo currently optimistic does not work .. no idea why though. maybe apollo 2 will fix it
      const updatedValue = Object.assign({}, mutationOptions.variables, {
        __typename: updateOptimistic.typename
      })
      if (!updatedValue.id) {
        updatedValue.id = -1
      }
      Object.assign(mutationOptions, {
        updateQueries: {
          [updateOptimistic.query] (previousResult, {mutationResult}) {
            const data = mutationResult.data[mutationName]
            const oldData = previousResult[updateOptimistic.query]
            let newArray
            const index = oldData.findIndex(e => e.id === data && data.id)
            if (!data || !oldData) {
              console.warn('no optimistic result found')
              return
            }
            if (mutationName.indexOf('delete') !== -1) {
              // remove
              return {[updateOptimistic.query]: oldData.splice(index, 1)}
            } else if (mutationName.indexOf('update') !== -1) {
              // update
              newArray = oldData
              newArray[index] = data
              return {
                [updateOptimistic.query]: newArray
              }
            } else {
              // create
              return {[updateOptimistic.query]: oldData.unshift(data)}
            }
          }
        },
        optimisticResponse: {
          __typename: 'Mutation',
          [mutationName]: updatedValue
        }
      })
    }
    try {
      vuexUpdating && dispatch(vuexUpdating, true)
      const {data} = await $apollo.mutate(mutationOptions)
      vuexUpdating && dispatch(vuexUpdating, false)
      return mutationName ? data[mutationName] : data
    } catch (e) {
      vuexUpdating && dispatch(vuexUpdating, false)
      dispatch('setError', JSON.stringify(e))
      return Promise.reject(e)
    }
  }
}
