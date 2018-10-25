import middleware from '../middleware'

middleware['isAuth'] = function ({ store, redirect, isHMR }) {
  if (isHMR) return
  if (!store.getters.canEdit) {
    return redirect('/')
  }
}
