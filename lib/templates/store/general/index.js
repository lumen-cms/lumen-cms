import {setToken, unsetToken} from '../../util/authHelpers'
import initialAsyncData from '../../util/hooks/initialAsyncData'
import Vue from 'vue'

const AUTH = {
  ROLE: {
    ADMIN: 'Admin',
    CONTRIBUTOR: 'Contributor',
    MODERATOR: 'Moderator'
  },
  roles: ['Admin', 'Moderator', 'Contributor']
}

export const state = {
  cmsLoading: false,
  locale: 'en',
  authUserId: null,
  authUser: null,
  authToken: null,
  mainSearch: null,
  searchActive: false,
  showMediaLibrary: false,
  mediaLibraryItems: [],
  mediaAlreadySelected: [],
  mediaOrderBy: 'createdAt_DESC',
  hasJumbotron: false,
  activeSidebarRight: false,
  activeSidebarLeft: false,
  windowLoaded: false
}

export const getters = {
  canEdit: (state, getters) => (getters.isAdmin || getters.isModerator),
  isModerator: state => !!(state.authUser && state.authUser.role === AUTH.ROLE.MODERATOR),
  isAdmin: state => {
    return !!(state.authUser && state.authUser.role === AUTH.ROLE.ADMIN)
  }
}

export const mutations = {
  SET_LANG: (state, {locale, $cms}) => {
    state.locale = $cms.languages.includes(locale) ? locale : state.locale
  },
  SET_USER: (state, user) => {
    Vue.set(state, 'authUser', user)
    state.authUserId = user && user.id
  },
  SET_AUTH_TOKEN: (state, val) => {
    state.authToken = val
  },
  SET_SIDEBAR_RIGHT: (state, val) => {
    state.activeSidebarRight = val
  },
  SET_MAIN_SEARCH: (state, val) => {
    state.mainSearch = val
  },
  SET_SEARCH_ACTIVE: (state, val) => {
    state.searchActive = val
  },
  SET_ERROR (state, error) {
    state.error = error
  },
  SET_CMS_LOADING (state, val) {
    state.cmsLoading = val
  },
  SET_MEDIA_LIBRARY (state, val) {
    state.showMediaLibrary = val
  },
  SET_MEDIA_LIBRARY_DATA (state, val) {
    state.mediaLibraryItems = val
  },
  SET_MEDIA_LIBRARY_EXISTING (state, val) {
    state.mediaAlreadySelected = val
  },
  SET_MEDIA_ORDER (state, val) {
    state.mediaOrderBy = val
  },
  SET_CMS_JUMBOTRON (state, val) {
    state.hasJumbotron = val
  },
  SET_SIDEBAR_LEFT: (state, val) => {
    state.activeSidebarLeft = val
  },
  SET_WINDOW_LOADED: (state, val) => {
    state.windowLoaded = val
  }

}

export const actions = {
  async nuxtServerInit ({dispatch}, {store, req, params, app}) {
    const {locale} = initialAsyncData({req, store, params, $cms: app.$cms})
    await dispatch('setLanguageKey', locale)
  },
  setWindowLoaded ({commit}, state) {
    commit('SET_WINDOW_LOADED', state)
  },
  /**
   *
   * @param commit
   * @param state
   */
  toggleCmsLoading ({commit, state}) {
    commit('SET_CMS_LOADING', !state.cmsLoading)
  },

  /**
   *
   * @param commit
   * @param dispatch
   * @param payload
   */
  async setLanguageKey ({commit, state, dispatch}, payload) {
    await commit('SET_LANG', {locale: payload, $cms: this.app.$cms})
    this.app.i18n && (this.app.i18n.locale = payload)

    const locale = payload.toUpperCase()
    const templates = state.pageTemplates || []
    if (templates.length && templates[0].languageKey.toUpperCase() === locale) {
      return Promise.resolve(true)
    }
    const server = (['production', 'staging'].includes(process.env.NODE_ENV) || process.env.ENFORCE_GQL_PROXY_PROD === '1')
      ? process.env.GQL_PROXY_PROD : process.env.GQL_PROXY_DEV
    console.log(server)
    const url = `${server}pageTemplate/${process.env.GRAPHQL_PROJECT_ID}`
    try {
      const data = await this.$axios.$get(url, {
        params: { locale },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept-Encoding': process.browser ? 'gzip, deflate, br' : 'gzip, deflate' // https://github.com/nuxt-community/axios-module/pull/176
        }
      })
      const pageTemplates = data.allPageTemplates
      await dispatch('setPageTemplates', pageTemplates)
      return Promise.resolve(true)
    } catch (e) {
      console.error(e)
      return Promise.reject(e)
    }
  },
  toggleContentEditMode ({commit}) {
    commit('TOGGLE_CONTENT_EDIT_MODE')
  },
  /**
   *
   * @param commit
   * @param result
   * @returns {Promise.<void>}
   * @constructor
   */
  async LOGIN ({commit}, result) {
    try {
      const data = {
        user: {
          id: result.id,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role
        }
      }
      setToken(data)
      await this.$apolloHelpers.onLogin(result.token)
      commit('SET_AUTH_TOKEN', result.token)
      commit('SET_USER', data.user)
      return Promise.resolve(true)
    } catch (e) {
      return Promise.reject(e)
    }
  },
  /**
   *
   * @param commit
   * @returns {*}
   * @constructor
   */
  async LOGOUT ({commit}) {
    unsetToken()
    await this.$apolloHelpers.onLogout()
    commit('SET_USER', null)
    commit('SET_AUTH_TOKEN', null)
    return Promise.resolve(true) // important because dispatch is async
  },
  /**
   * sets search text
   * @param commit
   * @param payload
   */
  setMainSearch ({commit}, payload) {
    commit('SET_MAIN_SEARCH', payload)
  },
  /**
   *
   * @param commit
   * @param state
   */
  toggleSearchActive ({commit, state}) {
    commit('SET_SEARCH_ACTIVE', !state.searchActive)
  },
  /**
   *
   * @param commit
   * @param err
   */
  setError ({commit}, err) {
    commit('SET_ERROR', err)
  },
  /**
   *
   * @param commit
   * @param val
   */
  setMediaLibrary ({commit}, val) {
    commit('SET_MEDIA_LIBRARY', val)
  },
  /**
   *
   * @param commit
   * @param val
   */
  setMediaLibraryData ({commit}, val) {
    commit('SET_MEDIA_LIBRARY_DATA', val)
  },

  /**
   *
   * @param commit
   * @param val
   */
  setMediaExistingFiles ({commit}, val) {
    commit('SET_MEDIA_LIBRARY_EXISTING', val)
  },
  /**
   *
   * @param commit
   * @param val
   */
  setMediaOrderBy ({commit}, val) {
    commit('SET_MEDIA_ORDER', val)
  },

  /**
   *
   * @param commit
   * @param val
   */
  setCmsJumbotron ({commit}, val) {
    commit('SET_CMS_JUMBOTRON', val)
  },

  /**
   *
   * @param commit
   * @param state
   */
  toggleSidebarLeft ({commit, state}) {
    commit('SET_SIDEBAR_LEFT', !state.activeSidebarLeft)
  },

  /**
   * toggles the state of drawer
   * @param commit
   * @param state
   */
  toggleSidebarRight ({commit, state}) {
    commit('SET_SIDEBAR_RIGHT', !state.activeSidebarRight)
  }
}
