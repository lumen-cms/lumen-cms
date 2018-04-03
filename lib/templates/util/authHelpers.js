import Vue from 'vue'

/**
 * set token to cookie
 * @param token
 * @param user
 */
export const setToken = ({token, user}) => {
  if (process.server) {
    return
  }
  Vue.ls.set('token', token)
  Vue.ls.set('user_credentials', user)
}

/**
 * unset the user token
 */
export const unsetToken = () => {
  if (process.server) {
    return
  }
  Vue.ls.remove('token')
  Vue.ls.remove('user_credentials')
}

/**
 * get token from store
 * @returns
 */
export const getTokenFromStorage = () => {
  if (process.server) {
    return
  }
  const token = Vue.ls.get('token')
  const user = Vue.ls.get('user_credentials')
  return {
    token,
    user
  }
}
