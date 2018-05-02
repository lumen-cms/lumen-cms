import {
  slugifyTemplateKey
} from '../../util/slugifyHelpers'

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
  pageProps: {
    articleId: null,
    id: null,
    languageKey: null
  },
  currentArticleCategories: []
}

export const mutations = {
  SET_SINGLE_ITEM (state, {
    stateName,
    element
  }) {
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
  },
  SET_CURRENT_ARTICLE_CATEGORIES (state, val) {
    state.currentArticleCategories = val
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
  isPageTemplateVisible: (state) => ($cms, section) => {
    const categories = state.currentArticleCategories
    let templateVisibilityElement = $cms.templateVisibility[section]
    if (typeof templateVisibilityElement === 'boolean') {
      return templateVisibilityElement
    } else if (typeof templateVisibilityElement === 'string') {
      return !!categories.find(category => [category.slug, category.title, category.id].includes(templateVisibilityElement))
    } else if (Array.isArray(templateVisibilityElement)) {
      return !!categories.find(category => templateVisibilityElement.some(item => [category.slug, category.title, category.id].includes(item)))
    }
    return true
  },
  // hasSecondaryNav: (state) => ({secondarySidebar}) => {
  //   const articleCat = secondarySidebar && secondarySidebar.activateByArticleCategory
  //   const cats = state.currentArticleCategories
  //
  //   if (!articleCat || !cats.length) return false
  //   for (let i = 0, n = cats.length; i < n; i++) {
  //     if (cats[i].includes(articleCat)) return true
  //   }
  // },
  /**
   *
   * @param state
   */
  getErrors (state) {
    let error
    try {
      error = state.error && JSON.parse(state.error)
    } catch (e) {
      error = state.error
    }
    const errors = error && error.graphQLErrors
    if (errors && errors.length) {
      return errors.map(e => {
        return `path: ${e.path}, code: ${e.code}, message: ${e.message}, requestId: ${e.requestId}`
      }).join(', ')
    }
    return error
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
   * @param val
   */
  setCurrentArticleCategories ({commit}, val) {
    commit('SET_CURRENT_ARTICLE_CATEGORIES', val)
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
      updateQuery: (previousResult, {
        fetchMoreResult
      }) => {
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
      const {
        data
      } = await $apollo.query(queryOptions)
      return queryName ? data[queryName] : data
    } catch (e) {
      console.error(e)
      dispatch('setError', JSON.stringify(e))
    }
  },
  async mutateGql ({dispatch}, {mutationOptions, mutationName}) {
    let vuexUpdating
    const $apollo = this.app.apolloProvider.defaultClient
    if (mutationName) {
      vuexUpdating = 'setUpdating'
    }
    if (mutationName && mutationName.indexOf('delete') !== -1) {
      vuexUpdating = 'setDeleting'
    }
    try {
      vuexUpdating && dispatch(vuexUpdating, true)
      const res = await $apollo.mutate(mutationOptions)
        .then(({data}) => mutationName ? (data && data[mutationName]) : data)
      vuexUpdating && dispatch(vuexUpdating, false)
      return Promise.resolve(res)
    } catch (e) {
      vuexUpdating && dispatch(vuexUpdating, false)
      dispatch('setError', JSON.stringify(e))
      return Promise.reject(e)
    }
  }
}
