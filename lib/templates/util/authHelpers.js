import Vue from 'vue'
import Cookies from 'js-cookie'

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
  Cookies.set('token', token)
  Cookies.set('user_credentials', user)
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
  Cookies.remove('token')
  Cookies.remove('user_credentials')
}

/**
 * get token from store
 * @param req
 * @returns
 */
export const getTokenFromStorage = (req) => {
  if (process.server) {
    const cookie = require('cookie') // request parser for the cookie
    const cookies = cookie.parse(req.headers.cookie || '')
    return {
      token: cookies.token,
      user: cookies.user_credentials && JSON.parse(cookies.user_credentials)
    }
  }
  const token = Vue.ls.get('token')
  const user = Vue.ls.get('user_credentials')
  return {
    token,
    user
  }
}
