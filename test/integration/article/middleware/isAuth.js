export default function ({store, redirect}) {
  console.log('isAuth', process.client, store.getters.canEdit)
  if (!store.getters.canEdit && !process.server) {
    return redirect('/')
  }
}
