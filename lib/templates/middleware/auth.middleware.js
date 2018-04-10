import middleware from '../middleware'
import {getTokenFromStorage} from '~cms/util/authHelpers'

middleware['auth'] = function ({store, redirect, isHMR, req}) {
  if (isHMR) return
  const storage = getTokenFromStorage(req)
  store.commit('SET_AUTH_TOKEN', storage.token)
  store.commit('SET_USER', storage.user)
  // todo validate the token / user if the graphcool token still valid
}
