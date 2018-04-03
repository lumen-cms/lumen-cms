import Vue from 'vue'

export const state = {
  toggleUrlAliasRefetch: false,
  toggleArticleRefetch: false,
  isContentEditMode: false,
  contentEditDialogData: {id: null, content: {id: null}, pageProps: null, dialogType: null},
  contentEditLinkDialogActive: false,
  contentCutData: {id: null},
  contentPublishData: {id: null, published: false},
  contentPasteData: {id: null},
  contentMoveData: {id: null},
  contentCopyData: {id: null},
  contentCopyPasteData: {id: null}
}

export const getters = {
  getDialogData (state) {
    return state.isContentEditMode ? state.contentEditDialogData : null
  },
  getDialogType (state) {
    return state.isContentEditMode ? state.contentEditDialogData && state.contentEditDialogData.dialogType : null
  }
}

export const mutations = {
  TOGGLE_URL_ALIAS_REFETCH (state) {
    state.toggleUrlAliasRefetch = !state.toggleUrlAliasRefetch
  },
  TOGGLE_ARTICLE_REFETCH (state) {
    state.toggleArticleRefetch = !state.toggleArticleRefetch
  },
  TOGGLE_CONTENT_EDIT_MODE: (state, val) => {
    state.isContentEditMode = !state.isContentEditMode
  },
  SET_CONTENT_EDIT_DIALOG_DATA: (state, val) => {
    state.contentEditDialogData = val
  },
  SET_CONTENT_LINK_DIALOG_ACTIVE: (state, val) => {
    state.contentEditLinkDialogActive = val
  },
  SET_CONTENT_CUT_DATA: (state, val) => {
    state.contentCutData = val
  },
  SET_CONTENT_PUBLISH: (state, val) => {
    state.contentPublishData = val
  },
  SET_CONTENT_PASTE_DATA: (state, val) => {
    state.contentPasteData = val
  },
  SET_CONTENT_MOVE_DATA: (state, val) => {
    state.contentMoveData = val
  },
  SET_CONTENT_COPY_DATA: (state, val) => {
    state.contentCopyData = val
  },
  SET_CONTENT_COPY_PASTE_DATA: (state, val) => {
    state.contentCopyPasteData = val
  }
}
export const actions = {
  refetchUrlAlias ({commit}) {
    commit('TOGGLE_URL_ALIAS_REFETCH')
  },
  refetchArticle ({commit}) {
    commit('TOGGLE_ARTICLE_REFETCH')
  },
  setContentEditDialogData ({commit}, val) {
    commit('SET_CONTENT_EDIT_DIALOG_DATA', val)
  },
  setContentCutData ({commit}, val) {
    commit('SET_CONTENT_CUT_DATA', val)
    Vue.ls.set('setContentCutData', val)
  },
  setContentPasteData ({commit}, val) {
    commit('SET_CONTENT_PASTE_DATA', val)
  },
  setContentMoveData ({commit}, val) {
    commit('SET_CONTENT_MOVE_DATA', val)
  },
  setContentPublish ({commit}, val) {
    commit('SET_CONTENT_PUBLISH', val)
  },
  setContentCopyData ({commit}, val) {
    if (!val.id) {
      commit('SET_CONTENT_COPY_PASTE_DATA', {id: null})
    }
    commit('SET_CONTENT_COPY_DATA', val)
    Vue.ls.set('setContentCopyData', val)
  },
  setContentCopyPasteData ({commit}, val) {
    commit('SET_CONTENT_COPY_PASTE_DATA', val)
  }
}
