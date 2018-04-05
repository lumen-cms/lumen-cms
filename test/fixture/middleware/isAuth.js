export default function ({store, redirect}) {
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
}
