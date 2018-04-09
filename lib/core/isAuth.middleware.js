import middleware from '../middleware'

middleware['isAuth'] = function ({store, redirect, isHMR, isServer}) {
  console.log('!!!!!', store.getters.canEdit, process.browser, process.server)
  if (isHMR || process.server) return
  if (!store.getters.canEdit) {
    return redirect('/')
  }
}
