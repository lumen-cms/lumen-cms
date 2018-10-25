import middleware from '../middleware'
import { getTokenFromStorage } from '~cms/util/authHelpers'

middleware['auth'] = function ({ store, redirect, isHMR, req, app }) {
  if (isHMR) return
  const storage = getTokenFromStorage(req)
  const token = app.$apolloHelpers.getToken()
  store.commit('SET_AUTH_TOKEN', token)
  store.commit('SET_USER', storage.user)
  // todo validate the token / user if the graphcool token still valid
}
