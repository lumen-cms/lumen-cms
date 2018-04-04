import middleware from '<%= options.srcDir %>/middleware'

middleware['isAuth'] = function ({store, redirect}) {
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
}
